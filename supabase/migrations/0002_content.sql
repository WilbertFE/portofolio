-- Content tables for the admin CMS.
-- Run this in the Supabase SQL editor AFTER 0001_better_auth.sql.
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text not null,
  href        text not null,
  year        int  not null,
  -- null renders the <Skeleton> placeholder, matching the old `image: ""`.
  -- Holds either a path under public/ or a full Supabase Storage URL.
  image_url   text,
  -- [{ "key": "RiNextjsFill", "color": "white" }] - key resolves through
  -- src/lib/icon-registry.ts, because react-icons components are not
  -- serialisable.
  icons       jsonb not null default '[]'::jsonb,
  badges      text[] not null default '{}',
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists projects_year_idx on public.projects (year desc);

-- ---------------------------------------------------------------------------
-- certificates
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  issuer        text not null,
  issued_at     date,
  valid_until   date,
  credential_id text,
  -- null renders no Verify button - the card keys off presence, as before.
  credential_url text,
  pdf_url       text,
  -- Ordered page previews. page_count is array_length(page_urls, 1), never
  -- stored separately, so the two can't drift.
  page_urls     text[] not null default '{}',
  published     boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists certificates_sort_idx
  on public.certificates (sort_order, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists certificates_set_updated_at on public.certificates;
create trigger certificates_set_updated_at
  before update on public.certificates
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
--
-- Anon may read published rows and nothing else. Every admin write goes
-- through the service-role client, which bypasses RLS entirely, so there are
-- deliberately no insert/update/delete policies here.
-- ---------------------------------------------------------------------------
alter table public.projects     enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "published projects are public" on public.projects;
create policy "published projects are public"
  on public.projects for select
  to anon, authenticated
  using (published);

drop policy if exists "published certificates are public" on public.certificates;
create policy "published certificates are public"
  on public.certificates for select
  to anon, authenticated
  using (published);

-- ---------------------------------------------------------------------------
-- messages (contact form)
--
-- Created here because a fresh Supabase project has no messages table. On a
-- project that already has one, `if not exists` leaves it untouched - check
-- the column names match if yours predates this file.
--
-- The form inserts with the anon key, so that policy stays. Nothing may read
-- it back: the admin inbox uses the service-role client behind an auth check.
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

alter table public.messages enable row level security;

drop policy if exists "anyone can send a message" on public.messages;
create policy "anyone can send a message"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- Intentionally absent: any select policy on public.messages.
