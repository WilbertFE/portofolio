import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js 16 renamed middleware.ts to proxy.ts. It runs on the Node runtime by
 * default and setting `runtime` here throws.
 *
 * This only checks that a session cookie is present - it does not validate it,
 * and a matcher change could silently drop coverage. It exists so signed-out
 * visitors get bounced to /login without a page render, and so signed-in ones
 * are not shown a sign-in form they have no use for. Authorization is enforced
 * in every admin page and route handler via src/lib/auth-guard.ts.
 */

/** Only ever send people to a path on this site. */
function safeInternalPath(value: string | null) {
  if (!value) return "/";
  // "//evil.example" is protocol-relative and would leave the site.
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  if (pathname === "/login") {
    // Signed in already - the login form has nothing to offer.
    //
    // The `error` exception matters: requireAdminPage sends a signed-in
    // non-admin here as /login?error=forbidden to explain the refusal. Without
    // it, this would bounce them back to /admin, which would refuse them
    // again, forever.
    if (sessionCookie && !searchParams.has("error")) {
      const target = safeInternalPath(searchParams.get("redirect"));
      return NextResponse.redirect(new URL(target, request.url));
    }
    return NextResponse.next();
  }

  // Everything else this matcher covers is under /admin.
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
