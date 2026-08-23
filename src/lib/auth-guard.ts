import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth, type Session } from "@/lib/auth";

/**
 * The real security boundary. src/proxy.ts only checks that a session cookie
 * exists, which is a UX shortcut and nothing more - every admin page and route
 * handler has to validate the session itself.
 */
export async function getSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() });
}

export function isAdmin(session: Session | null) {
  return session?.user.role === "admin";
}

/** For pages: redirects instead of returning, so callers can assume a session. */
export async function requireAdminPage(): Promise<Session> {
  const session = await getSession();

  if (!session) redirect("/login");
  if (!isAdmin(session)) redirect("/login?error=forbidden");

  return session;
}

/**
 * For route handlers. Returns a NextResponse to bail out with, or the session
 * when the caller may proceed:
 *
 *   const guard = await requireAdminApi();
 *   if (guard instanceof NextResponse) return guard;
 */
export async function requireAdminApi(): Promise<Session | NextResponse> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return session;
}
