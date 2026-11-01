-- Run this once in Supabase SQL Editor.
create table if not exists public.user_libraries (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_libraries enable row level security;

create policy "Users can read their own library"
on public.user_libraries for select
using (auth.uid() = user_id);

create policy "Users can insert their own library"
on public.user_libraries for insert
with check (auth.uid() = user_id);

create policy "Users can update their own library"
on public.user_libraries for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
