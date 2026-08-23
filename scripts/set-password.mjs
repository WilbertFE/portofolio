/**
 * Sets a new password for an existing account.
 *
 *   npm run auth:set-password
 *
 * Does not ask for the current password, so it works when you have forgotten
 * or mistyped it. That is safe here because running it already requires the
 * DATABASE_URL secret - anyone who has that owns the database anyway.
 *
 * Hashes with Better Auth's own hashPassword, so the result is identical to a
 * password set through sign-up, and revokes existing sessions afterwards.
 *
 * Non-interactive fallback: set ADMIN_EMAIL and ADMIN_PASSWORD.
 */
import { hashPassword } from "better-auth/crypto";
import { Client } from "pg";
import { hasTty, withPrompts } from "./lib/prompt.mjs";

process.loadEnvFile(".env.local");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

async function collect() {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    console.log("Using ADMIN_EMAIL / ADMIN_PASSWORD from the environment.\n");
    return {
      email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
      password: process.env.ADMIN_PASSWORD,
    };
  }

  if (!hasTty()) {
    throw new Error(
      "No terminal to prompt on. Either run this in a normal terminal, or set\n" +
        "ADMIN_EMAIL and ADMIN_PASSWORD in the environment first."
    );
  }

  return withPrompts(async (p) => {
    const email = (await p.ask("Account email: ")).trim().toLowerCase();
    const password = await p.askHidden("New password (min 8 chars): ");
    const confirm = await p.askHidden("Confirm new password: ");

    if (password !== confirm) throw new Error("The two passwords differ.");
    return { email, password };
  });
}

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function main() {
  const { email, password } = await collect();

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  await client.connect();

  const { rows } = await client.query(
    `select id, email from "user" where lower(email) = $1`,
    [email]
  );
  const user = rows[0];
  if (!user) {
    throw new Error(
      `No account found for ${email}. Run \`npm run auth:seed-admin\` to create one.`
    );
  }

  const hash = await hashPassword(password);

  // providerId 'credential' is the email/password account; a linked Google
  // account is a separate row and must not be touched.
  const updated = await client.query(
    `update account set password = $1, "updatedAt" = now()
      where "userId" = $2 and "providerId" = 'credential'`,
    [hash, user.id]
  );

  if (updated.rowCount === 0) {
    // Google-only account: give it a credential row so email sign-in works.
    await client.query(
      `insert into account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
       values (gen_random_uuid()::text, $1, 'credential', $1, $2, now(), now())`,
      [user.id, hash]
    );
    console.log("No email/password login existed; created one.");
  }

  // Any session opened with the old password should stop working.
  const revoked = await client.query(`delete from session where "userId" = $1`, [
    user.id,
  ]);

  console.log(`\nPassword updated for ${user.email}.`);
  if (revoked.rowCount > 0) {
    console.log(
      `Signed out ${revoked.rowCount} existing session${revoked.rowCount === 1 ? "" : "s"}.`
    );
  }
  console.log("Sign in again at /login.");
}

main()
  .catch((error) => {
    console.error("\n" + (error?.message ?? error));
    process.exitCode = 1;
  })
  .finally(() => client.end().catch(() => {}));
