// No `server-only` guard here on purpose: the Better Auth CLI has to be able
// to import this file to generate/migrate the schema, and it refuses to
// resolve a config that has one. Importing `pg` already makes this module
// impossible to bundle for the browser, so a client import fails loudly.
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

/**
 * Better Auth talks to Postgres directly (through Kysely), not through the
 * Supabase REST API, so this is a second door into the same Supabase database
 * that src/lib/db.ts reaches over HTTP.
 *
 * DATABASE_URL must point at Supabase's transaction pooler (port 6543), not
 * the direct connection on 5432: serverless functions open a pool per instance
 * and would otherwise exhaust Postgres' connection slots. `pg` uses unnamed
 * prepared statements by default, which is what the transaction pooler needs.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

/**
 * Sign-up is closed. Only these addresses may ever become a user row.
 *
 * This is deliberately belt-and-braces: `disableSignUp` on each provider is
 * the real gate, but this hook is the one place that catches a new account no
 * matter which path it arrived through. When the chat room ships and anyone
 * can register, empty this array.
 */
const SIGNUP_ALLOWLIST = ["wilbertbernardife@gmail.com"];

function isSignupAllowed(email: string) {
  if (SIGNUP_ALLOWLIST.length === 0) return true;
  return SIGNUP_ALLOWLIST.includes(email.toLowerCase());
}

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
    // No public registration. The admin account is created by
    // `npm run auth:seed-admin`, which calls the internal API directly.
    disableSignUp: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Google can sign an existing user in, but never create one. Signing in
      // with the seeded admin's Gmail links to that row instead (see
      // accountLinking below); any other Google account is rejected.
      disableSignUp: true,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  session: {
    // Every admin page and route handler calls getSession. Without this each
    // one would be a round trip to Postgres.
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isSignupAllowed(user.email)) {
            throw new Error("Sign-up is closed.");
          }
          return { data: user };
        },
      },
    },
  },

  // nextCookies() has to stay last: it wraps the response so server actions
  // can set the session cookie.
  plugins: [admin({ defaultRole: "user" }), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
