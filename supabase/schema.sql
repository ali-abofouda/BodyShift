-- Daily tracking schema for BodyShift
create extension if not exists "pgcrypto";

create table if not exists public.daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  date date not null,
  calories integer not null check (calories > 0),
  weight numeric(5,2) not null check (weight > 0),
  notes text,
  created_at timestamptz not null default now(),
  constraint daily_logs_user_date_unique unique (user_id, date)
);

create index if not exists daily_logs_user_id_idx on public.daily_logs (user_id);
create index if not exists daily_logs_date_idx on public.daily_logs (date desc);

alter table public.daily_logs enable row level security;

create policy "Users can read own logs"
on public.daily_logs
for select
using (auth.uid() = user_id);

create policy "Users can insert own logs"
on public.daily_logs
for insert
with check (auth.uid() = user_id);

create policy "Users can update own logs"
on public.daily_logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own logs"
on public.daily_logs
for delete
using (auth.uid() = user_id);
