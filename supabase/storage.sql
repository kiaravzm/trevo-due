-- Storage bucket + RLS policies for private contracts

insert into storage.buckets (id, name, public)
values ('contracts', 'contracts', false)
on conflict (id) do nothing;

create policy "contracts_select_own" on storage.objects
  for select
  using (
    bucket_id = 'contracts'
    and auth.uid() = owner
  );

create policy "contracts_insert_own" on storage.objects
  for insert
  with check (
    bucket_id = 'contracts'
    and auth.uid() = owner
  );

create policy "contracts_update_own" on storage.objects
  for update
  using (
    bucket_id = 'contracts'
    and auth.uid() = owner
  )
  with check (
    bucket_id = 'contracts'
    and auth.uid() = owner
  );

create policy "contracts_delete_own" on storage.objects
  for delete
  using (
    bucket_id = 'contracts'
    and auth.uid() = owner
  );
