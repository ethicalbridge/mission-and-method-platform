-- Method into Impact · CRM progress dashboard (16 Nov 2026)
-- Additive only: two new tables. Same access rule as the other crm_ tables (is_crm_admin()).

create table if not exists public.crm_deliverables (
  id                      uuid primary key default gen_random_uuid(),
  contact_id              uuid not null references public.crm_contacts(id) on delete cascade,
  name                    text not null check (char_length(name) between 1 and 200),
  version                 int  not null default 1 check (version >= 1),
  due_at                  timestamptz,
  sent_at                 timestamptz,
  feedback_due_at         timestamptz,
  feedback_at             timestamptz,
  final_at                timestamptz,
  attachment_id           uuid references public.crm_attachments(id) on delete set null,
  feedback_attachment_id  uuid references public.crm_attachments(id) on delete set null,
  notes                   text,
  created_at              timestamptz not null default now(),
  created_by              text default (auth.jwt() ->> 'email'),
  updated_at              timestamptz not null default now(),
  unique (contact_id, name, version)
);
create index if not exists crm_deliverables_contact_idx on public.crm_deliverables (contact_id, name, version);

create table if not exists public.crm_timeline (
  id              uuid primary key default gen_random_uuid(),
  contact_id      uuid not null references public.crm_contacts(id) on delete cascade,
  at              timestamptz not null default now(),
  direction       text not null default 'internal' check (direction in ('in','out','internal')),
  channel         text not null default 'other'    check (channel in ('email','whatsapp','meeting','call','doc','other')),
  step            text check (step in ('brief','prep','call','recap','proposal','agreement','build','review','handover','close','followup')),
  kind            text not null default 'note' check (kind in ('message','meeting','doc_sent','doc_received','agreement_sent','agreement_signed','reminder','milestone','deadline','note')),
  title           text not null check (char_length(title) between 1 and 200),
  body            text,
  due_at          timestamptz,
  owed_by         text check (owed_by in ('M','C','MC')),
  done_at         timestamptz,
  attachment_id   uuid references public.crm_attachments(id)  on delete set null,
  deliverable_id  uuid references public.crm_deliverables(id) on delete set null,
  meta            jsonb not null default '{}'::jsonb,
  source          text not null default 'manual' check (source in ('manual','backfill','import')),
  created_at      timestamptz not null default now(),
  created_by      text default (auth.jwt() ->> 'email'),
  updated_at      timestamptz not null default now(),
  constraint crm_timeline_due_needs_owner check (due_at is null or owed_by is not null)
);
create index if not exists crm_timeline_contact_at_idx on public.crm_timeline (contact_id, at);
create index if not exists crm_timeline_open_due_idx   on public.crm_timeline (due_at) where done_at is null and due_at is not null;

create or replace function public.crm_progress_touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists crm_timeline_touch on public.crm_timeline;
create trigger crm_timeline_touch before update on public.crm_timeline
  for each row execute function public.crm_progress_touch_updated_at();
drop trigger if exists crm_deliverables_touch on public.crm_deliverables;
create trigger crm_deliverables_touch before update on public.crm_deliverables
  for each row execute function public.crm_progress_touch_updated_at();

alter table public.crm_timeline     enable row level security;
alter table public.crm_deliverables enable row level security;

create policy admin_rw_timeline on public.crm_timeline
  for all to authenticated using (is_crm_admin()) with check (is_crm_admin());
create policy admin_rw_deliverables on public.crm_deliverables
  for all to authenticated using (is_crm_admin()) with check (is_crm_admin());

revoke all on public.crm_timeline, public.crm_deliverables from anon;
grant select, insert, update, delete on public.crm_timeline, public.crm_deliverables to authenticated;

alter publication supabase_realtime add table public.crm_timeline, public.crm_deliverables;
