import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type Message = {
  id: number | string;
  name: string;
  message: string;
  created_at: string | null;
};

/**
 * The messages table has an anon insert policy but deliberately no select
 * policy, so this is the only way to read the contact form's output.
 */
export async function GET() {
  const guard = await requireAdminApi();
  if (guard instanceof NextResponse) return guard;

  const { data, error } = await getSupabaseAdmin()
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Failed to list messages", error);
    return NextResponse.json(
      { error: "Failed to list messages" },
      { status: 500 }
    );
  }

  return NextResponse.json({ messages: (data ?? []) as Message[] });
}
