/**
 * Creates the one admin account. Public sign-up is disabled, so this is the
 * only way in.
 *
 *   npm run auth:seed-admin
 *
 * It builds its own Better Auth instance against the same database and secret,
 * but with sign-up enabled - rather than poking a scrypt hash into Postgres by
 * hand, which is easy to get subtly wrong. Then it promotes the row to
 * role = 'admin'.
 *
 * Re-running with an existing email just promotes that user.
 */
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { Pool } from "pg";

process.loadEnvFile(".env.local");

for (const key of ["DATABASE_URL", "BETTER_AUTH_SECRET"]) {
  if (!process.env[key]) {
    console.error(`${key} is not set in .env.local`);
    process.exit(1);
  }
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });

const seedAuth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  // Sign-up on purpose here; the app's own config keeps it disabled.
  emailAndPassword: { enabled: true },
  plugins: [admin({ defaultRole: "user" })],
});

/** Reads a line without echoing it, so the password stays off the screen. */
async function promptHidden(rl, question) {
  const onKeypress = () => rl.output.write("\x1b[2K\x1b[200D" + question);
  stdout.write(question);
  rl.input.on("data", onKeypress);
  try {
    return await rl.question("");
  } finally {
    rl.input.off("data", onKeypress);
    stdout.write("\n");
  }
}

/**
 * Prompts, unless ADMIN_EMAIL and ADMIN_PASSWORD are already in the
 * environment. The env path exists for terminals where the hidden-password
 * prompt misbehaves, and for re-running this without interaction.
 */
async function collectCredentials() {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    console.log("Using ADMIN_EMAIL / ADMIN_PASSWORD from the environment.\n");
    return {
      email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
      name: process.env.ADMIN_NAME?.trim() || "Admin",
      password: process.env.ADMIN_PASSWORD,
    };
  }

  if (!stdin.isTTY) {
    throw new Error(
      "No terminal to prompt on. Either run this in a normal terminal, or set\n" +
        "ADMIN_EMAIL and ADMIN_PASSWORD in the environment first."
    );
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const email = (await rl.question("Admin email: ")).trim().toLowerCase();
    const name = (await rl.question("Display name: ")).trim() || "Admin";
    const password = await promptHidden(rl, "Password (min 8 chars): ");
    return { email, name, password };
  } finally {
    rl.close();
  }
}

async function main() {
  const { email, name, password } = await collectCredentials();

  if (!email.includes("@")) {
    throw new Error("That does not look like an email address.");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  try {
    await seedAuth.api.signUpEmail({ body: { email, password, name } });
    console.log("Created user.");
  } catch (error) {
    // Already exists is fine - fall through to the promotion below.
    const message = String(error?.message ?? error);
    if (!/exist/i.test(message)) throw error;
    console.log("User already exists, promoting instead.");
  }

  const { rowCount } = await pool.query(
    `update "user" set role = 'admin' where lower(email) = $1`,
    [email]
  );

  if (rowCount === 0) {
    throw new Error(`No user row found for ${email}.`);
  }

  console.log(`\n${email} is now an admin. Sign in at /login.`);
  console.log(
    "Reminder: SIGNUP_ALLOWLIST in src/lib/auth.ts must contain this address " +
      "or Google sign-in will be rejected."
  );
}

main()
  .catch((error) => {
    console.error("\n" + (error?.message ?? error));
    process.exitCode = 1;
  })
  .finally(() => pool.end());
