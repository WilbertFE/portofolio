import { createClient } from "@supabase/supabase-js";
import { STORAGE_BUCKET } from "@/lib/storage";

/**
 * Browser-side uploads. The bytes go straight from the admin's browser to
 * Supabase Storage using a short-lived signed URL minted by /api/admin/upload,
 * so nothing large passes through a serverless function (Vercel caps request
 * bodies at 4.5 MB).
 *
 * This anon client is only ever used as a transport for uploadToSignedUrl,
 * which authorises off the token rather than the key.
 */
const storageClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""
);

/** Strips anything that could confuse a storage path. */
export function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function fileExtension(name: string, fallback: string) {
  const match = /\.([a-z0-9]+)$/i.exec(name);
  return match ? match[1].toLowerCase() : fallback;
}

/**
 * Uploads one file to `path` inside the portfolio bucket and returns its
 * public URL.
 */
export async function uploadFile(path: string, file: Blob): Promise<string> {
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Could not get an upload URL");
  }

  const { token, publicUrl } = (await response.json()) as {
    token: string;
    publicUrl: string;
  };

  const { error } = await storageClient.storage
    .from(STORAGE_BUCKET)
    .uploadToSignedUrl(path, token, file, { upsert: true });

  if (error) throw new Error(error.message);

  // Cache-bust: re-uploading the same path serves the old bytes otherwise.
  return `${publicUrl}?v=${Date.now()}`;
}
