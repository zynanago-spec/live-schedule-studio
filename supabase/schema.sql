create extension if not exists pgcrypto;

create table if not exists public.live_schedule_teachers (
  id text primary key,
  name text not null,
  avatar_bg text default '',
  avatar_fg text default '',
  avatar_url text default '',
  updated_at timestamptz default now()
);

create table if not exists public.live_schedule_records (
  id text primary key,
  live_date date not null,
  weekday text default '',
  teacher_text text default '',
  teacher_ids jsonb not null default '[]'::jsonb,
  account text default '',
  reservation_created text default 'yes',
  control_a text default '',
  control_b text default '',
  live_type text default '自播',
  topic text default '',
  start_time text default '',
  end_time text default '',
  products text default '',
  note text default '',
  updated_at timestamptz default now()
);

alter publication supabase_realtime add table public.live_schedule_teachers;
alter publication supabase_realtime add table public.live_schedule_records;

alter table public.live_schedule_teachers enable row level security;
alter table public.live_schedule_records enable row level security;

drop policy if exists "allow authenticated read teachers" on public.live_schedule_teachers;
drop policy if exists "allow public read teachers" on public.live_schedule_teachers;
create policy "allow public read teachers"
on public.live_schedule_teachers
for select
to anon, authenticated
using (true);

drop policy if exists "allow public write teachers" on public.live_schedule_teachers;
create policy "allow public write teachers"
on public.live_schedule_teachers
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "allow public read records" on public.live_schedule_records;
create policy "allow public read records"
on public.live_schedule_records
for select
to anon, authenticated
using (true);

drop policy if exists "allow public write records" on public.live_schedule_records;
create policy "allow public write records"
on public.live_schedule_records
for all
to anon, authenticated
using (true)
with check (true);
