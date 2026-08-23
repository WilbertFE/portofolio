import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

/**
 * Browser-side auth. baseURL is left unset so the client uses the current
 * origin, which keeps localhost and the Vercel deployment working from the
 * same build.
 */
export const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const { signIn, signOut, useSession } = authClient;
