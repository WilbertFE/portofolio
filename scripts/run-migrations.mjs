/**
 * Applies the hand-written SQL in supabase/migrations/ over DATABASE_URL.
 *
 *   npm run db:migrate            # every migration, in filename order
 *   npm run db:migrate 0003       # only files whose name contains "0003"
 *
 * Better Auth's own schema is skipped - `npm run auth:migrate` owns that.
 * Every migration here is written to be safe to re-run.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

process.loadEnvFile(".env.local");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "supabase", "migrations");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const filter = process.argv[2];

async function main() {
  const files = (await readdir(DIR))
    .filter((file) => file.endsWith(".sql"))
    .filter((file) => !file.includes("better_auth"))
    .filter((file) => !filter || file.includes(filter))
    .sort();

  if (files.length === 0) {
    console.log("No migrations to run.");
    return;
  }

  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    for (const file of files) {
      const sql = await readFile(path.join(DIR, file), "utf8");
      process.stdout.write(`${file} ... `);
      try {
        // Sent whole rather than split on ";" - the files contain $$-quoted
        // function bodies that a naive split would cut in half.
        await client.query(sql);
        console.log("ok");
      } catch (error) {
        console.log("FAILED");
        console.error(`  ${error.message}`);
        process.exitCode = 1;
      }
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
