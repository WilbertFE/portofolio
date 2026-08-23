import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { STORAGE_BUCKET } from "@/lib/storage";

/**
 * Service-role Supabase client. Bypasses RLS, so it must never be imported
 * from a client component - the "server-only" import above turns that into a
 * build error rather than a leaked key.
 *
 * Used for admin writes, storage signed-upload URLs, and reading the messages
 * table (which has no anon select policy). Public reads go through the anon
 * client in src/lib/db.ts instead.
 *
 * Created lazily: createClient() throws on a missing key, and doing that at
 * module scope would break `next build` on any machine without the secret,
 * even though no admin page is prerendered.
 */
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL must be set for admin operations"
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}

export { STORAGE_BUCKET };
