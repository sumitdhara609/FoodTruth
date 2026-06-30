create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create table if not exists public.saved_label_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  source text not null check (source in ('manual', 'upload', 'scan')),

  product_name text not null,
  brand_name text,
  category text,

  score integer not null check (score >= 0 and score <= 100),
  grade text not null,
  risk_level text not null,

  summary text not null,

  reviewed_label_data jsonb not null,
  nutrition_snapshot jsonb not null,
  ingredient_snapshot jsonb not null,
  claim_snapshot jsonb not null,
  serving_snapshot jsonb not null,
  better_choice_checklist jsonb not null,

  created_at timestamptz not null default now()
);

alter table public.saved_label_reports enable row level security;

create policy "Users can view their own saved reports"
on public.saved_label_reports
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own saved reports"
on public.saved_label_reports
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own saved reports"
on public.saved_label_reports
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists saved_label_reports_user_created_at_idx
on public.saved_label_reports(user_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();