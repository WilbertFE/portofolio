-- Lock down the Better Auth tables and create the storage bucket.
-- Run AFTER 0001_better_auth.sql. Safe to re-run.

-- ---------------------------------------------------------------------------
-- Better Auth tables
--
-- These live in `public`, which PostgREST exposes to the anon key. Better Auth
-- reaches them over DATABASE_URL as the `postgres` role, which bypasses RLS -
-- so enabling RLS with NO policies leaves Better Auth working while making the
-- tables invisible to the anon key.
--
-- Without this, anyone with the (publicly shipped) anon key could read the
-- session table and lift a session token.
-- ---------------------------------------------------------------------------
alter table public."user"       enable row level security;
alter table public."session"    enable row level security;
alter table public."account"    enable row level security;
alter table public."verification" enable row level security;

-- Intentionally absent: any policy on the four tables above.

-- ---------------------------------------------------------------------------
-- Storage
--
-- Public bucket: certificates and project mockups are already public assets
-- served out of public/ today, so this changes nothing about their exposure.
-- Do not put anything private here.
--
-- Uploads are done with the service-role key via signed upload URLs, so no
-- anon insert policy is needed.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio bucket is publicly readable" on storage.objects;
create policy "portfolio bucket is publicly readable"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');
