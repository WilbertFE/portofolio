import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin, STORAGE_BUCKET } from "@/lib/supabase-admin";
import { uploadRequestSchema } from "@/lib/schemas";

/**
 * Hands back a signed upload URL so the browser can PUT the file straight to
 * Supabase Storage.
 *
 * Uploading through this route instead would put the bytes in the request
 * body, and Vercel caps serverless request bodies at 4.5 MB - a multi-page
 * certificate (a PDF plus one image per page) can pass that.
 */
export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const parsed = uploadRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid path", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { path } = parsed.data;

  const storage = getSupabaseAdmin().storage.from(STORAGE_BUCKET);

  const { data, error } = await storage.createSignedUploadUrl(path, {
    upsert: true,
  });

  if (error || !data) {
    console.error("Failed to create signed upload URL", error);
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = storage.getPublicUrl(path);

  return NextResponse.json({
    path,
    token: data.token,
    signedUrl: data.signedUrl,
    publicUrl,
  });
}
