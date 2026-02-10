-- Add reminders_enabled to invoices if missing (fix schema cache error)
alter table public.invoices
  add column if not exists reminders_enabled boolean not null default true;
