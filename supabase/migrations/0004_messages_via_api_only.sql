-- Close direct browser writes to the contact form table.
-- Safe to re-run.
--
-- The form used to insert with the anon key, so the only validation was the
-- one running on the sender's machine and anyone holding the (public) anon key
-- could POST to the table directly - no length limits, no rate limit, no
-- honeypot.
--
-- POST /api/messages now does the insert with the service-role key, which
-- bypasses RLS. Dropping the anon insert policy makes that route the only way
-- a row can be created.
--
-- Ordering matters: deploy the code that calls /api/messages BEFORE running
-- this, or the live form will start failing silently.

drop policy if exists "anyone can send a message" on public.messages;

-- Belt and braces: RLS stays on with no policies at all, so anon and
-- authenticated can neither read nor write. Only the service-role key can.
alter table public.messages enable row level security;
