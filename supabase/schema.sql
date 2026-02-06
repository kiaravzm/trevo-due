-- AgencyDocs schema: proposals + invoices with RLS

create extension if not exists "pgcrypto";

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  email text,
  company text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  title text not null,
  status text not null default 'draft',
  amount_cents integer not null default 0,
  currency text not null default 'USD',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  proposal_id uuid references public.proposals (id) on delete set null,
  number text not null,
  status text not null default 'open',
  amount_cents integer not null default 0,
  currency text not null default 'USD',
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  customer_id uuid references public.customers (id) on delete set null,
  title text not null,
  file_path text not null,
  status text not null default 'signed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_user_id_idx on public.customers (user_id);
create index if not exists proposals_user_id_idx on public.proposals (user_id);
create index if not exists invoices_user_id_idx on public.invoices (user_id);
create index if not exists contracts_user_id_idx on public.contracts (user_id);

alter table public.customers enable row level security;
alter table public.proposals enable row level security;
alter table public.invoices enable row level security;
alter table public.contracts enable row level security;

create policy "customers_select_own" on public.customers
  for select
  using (auth.uid() = user_id);

create policy "customers_insert_own" on public.customers
  for insert
  with check (auth.uid() = user_id);

create policy "customers_update_own" on public.customers
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "customers_delete_own" on public.customers
  for delete
  using (auth.uid() = user_id);

create policy "proposals_select_own" on public.proposals
  for select
  using (auth.uid() = user_id);

create policy "proposals_insert_own" on public.proposals
  for insert
  with check (auth.uid() = user_id);

create policy "proposals_update_own" on public.proposals
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "proposals_delete_own" on public.proposals
  for delete
  using (auth.uid() = user_id);

create policy "invoices_select_own" on public.invoices
  for select
  using (auth.uid() = user_id);

create policy "invoices_insert_own" on public.invoices
  for insert
  with check (auth.uid() = user_id);

create policy "invoices_update_own" on public.invoices
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "invoices_delete_own" on public.invoices
  for delete
  using (auth.uid() = user_id);

create policy "contracts_select_own" on public.contracts
  for select
  using (auth.uid() = user_id);

create policy "contracts_insert_own" on public.contracts
  for insert
  with check (auth.uid() = user_id);

create policy "contracts_update_own" on public.contracts
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "contracts_delete_own" on public.contracts
  for delete
  using (auth.uid() = user_id);
