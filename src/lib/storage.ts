/**
 * Shared between the browser uploader and the server-side admin client, so it
 * cannot live in supabase-admin.ts (which is server-only).
 */
export const STORAGE_BUCKET = "portfolio";
