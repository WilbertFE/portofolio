import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";
import { certificateUpdateSchema, emptyToNull } from "@/lib/schemas";
import { mapCertificate, type CertificateRow } from "@/lib/content";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { id } = await params;
  const parsed = certificateUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid certificate", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const input = parsed.data;
  const row: Record<string, unknown> = {};
  if (input.slug !== undefined) row.slug = input.slug;
  if (input.title !== undefined) row.title = input.title;
  if (input.issuer !== undefined) row.issuer = input.issuer;
  if ("issuedAt" in input) row.issued_at = emptyToNull(input.issuedAt);
  if ("validUntil" in input) row.valid_until = emptyToNull(input.validUntil);
  if ("credentialId" in input) row.credential_id = emptyToNull(input.credentialId);
  if ("credentialUrl" in input) row.credential_url = emptyToNull(input.credentialUrl);
  if ("pdfUrl" in input) row.pdf_url = emptyToNull(input.pdfUrl);
  if (input.pageUrls !== undefined) row.page_urls = input.pageUrls;
  if (input.published !== undefined) row.published = input.published;
  if (input.sortOrder !== undefined) row.sort_order = input.sortOrder;

  if (Object.keys(row).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 422 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("certificates")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    const isDuplicate = error.code === "23505";
    console.error("Failed to update certificate", error);
    return NextResponse.json(
      {
        error: isDuplicate
          ? "That slug is already taken"
          : "Failed to update certificate",
      },
      { status: isDuplicate ? 409 : 500 }
    );
  }
  if (!data) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  revalidatePath("/certificates");

  return NextResponse.json({ certificate: mapCertificate(data as CertificateRow) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { id } = await params;

  // Read the row first so its uploaded files can go too - otherwise deleting a
  // certificate would orphan its PDF and page images in the bucket forever.
  const { data: existing } = await getSupabaseAdmin()
    .from("certificates")
    .select("slug, pdf_url, page_urls")
    .eq("id", id)
    .single();

  const { error } = await getSupabaseAdmin()
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete certificate", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }

  if (existing) {
    const publicPrefix = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
    const paths = [existing.pdf_url, ...(existing.page_urls ?? [])]
      .filter((url): url is string => typeof url === "string")
      .flatMap((url) => {
        const index = url.indexOf(publicPrefix);
        // Rows seeded from public/ hold plain paths and own no storage object.
        return index === -1 ? [] : [url.slice(index + publicPrefix.length)];
      });

    if (paths.length > 0) {
      const { error: storageError } = await getSupabaseAdmin()
    .storage
        .from(STORAGE_BUCKET)
        .remove(paths);
      // The row is already gone; a failed cleanup is worth logging, not a 500.
      if (storageError) {
        console.error("Failed to remove certificate assets", storageError);
      }
    }
  }

  revalidatePath("/certificates");

  return NextResponse.json({ ok: true });
}
