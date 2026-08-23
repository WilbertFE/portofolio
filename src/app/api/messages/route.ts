import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { messageSchema } from "@/lib/schemas";

/**
 * Contact form submissions.
 *
 * The form used to insert straight into Supabase from the browser with the
 * anon key, which meant the only validation was the one running on the
 * sender's machine and anyone could POST to the table directly. This route is
 * now the only way in: the anon insert policy is gone (migration 0004), so
 * writes require the service-role key, which never leaves the server.
 */

// Best-effort throttle. Serverless instances do not share memory, so this
// caps a single burst from one IP rather than being a real distributed limit -
// enough to stop a naive script, not a determined one. Anything stronger
// belongs in a shared store or at the edge.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { name, message, website } = parsed.data;

  // Honeypot tripped. Answer 200 so a bot cannot tell it was caught and
  // start probing for what gave it away.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Throttle only what reaches the database. Counting rejected submissions
  // would lock someone out for mistyping their name twice, while doing nothing
  // extra to protect the table - a failed validation never writes a row.
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a minute." },
      { status: 429 }
    );
  }

  const { error } = await getSupabaseAdmin()
    .from("messages")
    .insert({ name, message });

  if (error) {
    console.error("Failed to save message", error);
    return NextResponse.json(
      { error: "Could not send your message" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
