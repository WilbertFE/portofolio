import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js 16 renamed middleware.ts to proxy.ts. It runs on the Node runtime by
 * default and setting `runtime` here throws.
 *
 * This only checks that a session cookie is present - it does not validate it,
 * and a matcher change could silently drop coverage. It exists so signed-out
 * visitors get bounced to /login without a page render. Authorization is
 * enforced in every admin page and route handler via src/lib/auth-guard.ts.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
