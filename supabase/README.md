# Supabase setup

Run this once when pointing the app at a new Supabase project.

## 1. Create the project and collect four values

From the Supabase dashboard:

| Value | Where |
|---|---|
| Project URL | Settings → API → Project URL |
| anon key | Settings → API → anon / public |
| service_role key | Settings → API → service_role (**secret**) |
| Connection string | Connect → **Transaction pooler** |

The connection string **must** be the transaction pooler on port **6543**, not
the direct connection on 5432. Vercel runs each request in its own serverless
instance; pointing those at 5432 exhausts Postgres' connection slots. Replace
`[YOUR-PASSWORD]` in the string with the database password.

## 2. Fill in `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
DATABASE_URL=postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
```

`NEXT_PUBLIC_` on the first two is correct and intentional. The anon key is
designed to be public — it identifies the project rather than authorising
anything, and RLS is what protects the data. The service_role key and
`DATABASE_URL` have no prefix precisely because they must never reach a
browser.

## 3. Create the auth tables

```bash
npm run auth:migrate
```

This applies Better Auth's schema (`user`, `session`, `account`,
`verification`) straight to the database. To keep a copy of the SQL instead,
run `npm run auth:generate` and execute the file it writes.

## 4. Run the migrations

In the SQL editor, in order:

1. `0002_content.sql` — projects, certificates, messages, RLS policies
2. `0003_auth_rls_and_storage.sql` — locks down the auth tables, creates the
   `portfolio` storage bucket

Both are safe to re-run.

`0003` must come after step 3, since it alters tables Better Auth creates.

## 5. Create your admin account

```bash
npm run auth:seed-admin
```

Public sign-up is disabled, so this is the only way to create a user. Use the
address listed in `SIGNUP_ALLOWLIST` in `src/lib/auth.ts` — Google sign-in
matches on email, and any other address is rejected.

## 6. Move the existing content in

```bash
npm run seed:content
```

Inserts the 8 projects and 4 certificates that used to be hardcoded. Image
paths are left pointing at `public/`, so no assets move. Idempotent — it
upserts on `slug`.

## 7. Check it

```bash
npm run dev
```

`/projects` and `/certificates` should look exactly as they did before. Sign in
at `/login`, and an **Admin** entry appears in the sidebar.

---

## Notes

**Storage.** The `portfolio` bucket is public. Certificates and project mockups
are already public assets, so this changes nothing about their exposure — but
don't put anything private in it.

**Why RLS with no policies on the auth tables.** They live in `public`, which
PostgREST exposes to the anon key. Better Auth reaches them over `DATABASE_URL`
as the `postgres` role, which bypasses RLS. Enabling RLS with no policies
therefore leaves Better Auth working while making session tokens unreadable
through the public API. Skipping `0003` would publish them.

**Connection errors.** `remaining connection slots` almost always means
`DATABASE_URL` is the 5432 direct connection where the 6543 pooler belongs.
