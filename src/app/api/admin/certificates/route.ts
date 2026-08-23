import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  certificateSchema,
  emptyToNull,
  type CertificateInput,
} from "@/lib/schemas";
import { mapCertificate, type CertificateRow } from "@/lib/content";

export function certificateToRow(input: CertificateInput) {
  return {
    slug: input.slug,
    title: input.title,
    issuer: input.issuer,
    issued_at: emptyToNull(input.issuedAt),
    valid_until: emptyToNull(input.validUntil),
    credential_id: emptyToNull(input.credentialId),
    credential_url: emptyToNull(input.credentialUrl),
    pdf_url: emptyToNull(input.pdfUrl),
    page_urls: input.pageUrls,
    published: input.published,
    sort_order: input.sortOrder,
  };
}

export async function GET() {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { data, error } = await getSupabaseAdmin()
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to list certificates", error);
    return NextResponse.json(
      { error: "Failed to list certificates" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    certificates: (data as CertificateRow[]).map(mapCertificate),
  });
}

export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const parsed = certificateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid certificate", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { data, error } = await getSupabaseAdmin()
    .from("certificates")
    .insert(certificateToRow(parsed.data))
    .select("*")
    .single();

  if (error) {
    const isDuplicate = error.code === "23505";
    console.error("Failed to create certificate", error);
    return NextResponse.json(
      {
        error: isDuplicate
          ? "That slug is already taken"
          : "Failed to create certificate",
      },
      { status: isDuplicate ? 409 : 500 }
    );
  }

  revalidatePath("/certificates");

  return NextResponse.json(
    { certificate: mapCertificate(data as CertificateRow) },
    { status: 201 }
  );
}
