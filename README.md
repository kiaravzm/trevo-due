# TrevoDue

A lightweight SaaS for small service-based agencies to manage **clients, contracts, and
invoices** — with subscription billing and payment-reminder emails built in.

TrevoDue focuses on speed and clarity over the complexity of a full accounting or ERP
system. It is a personal project built to explore a realistic, production-shaped
Next.js stack end to end (auth, database with row-level security, payments, and
transactional email).

> Status: active development. This README describes what the app actually does today.

---

## Features

- **Authentication** — passwordless sign-in (magic link) via Supabase Auth.
- **Protected dashboard** — route protection through Next.js middleware plus a
  server-side auth check in the protected layout.
- **Clients** — create, edit, and remove customers.
- **Invoices** — track invoices with amount, currency (USD by default), status, due
  date, and an associated client. Amounts are stored as integer cents to avoid
  floating-point rounding bugs.
- **Payment reminders** — send reminder emails to a client for a given invoice
  (Resend), with a dedicated email builder for subject/text/HTML.
- **Contracts** — upload signed contracts as PDF to private Supabase Storage and
  access them through short-lived signed URLs.
- **Subscription billing** — Stripe Checkout for subscriptions, with an optional free
  trial and a Stripe webhook that keeps subscription state in sync.
- **Freemium limits** — the free plan is capped at 3 invoices and 3 contracts; an
  active or trialing subscription removes the cap.
- **i18n-ready** — a small, typed translation layer (English today, structured to add
  more locales).
- **Dark mode** — theme switching via `next-themes`.

---

## Tech stack

| Area          | Choice                                           |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 14 (App Router, React Server Components) |
| Language      | TypeScript (strict mode)                         |
| Auth & data   | Supabase (Postgres, Auth, Storage, RLS)          |
| Payments      | Stripe (Checkout + webhooks)                     |
| Email         | Resend                                           |
| UI            | Tailwind CSS + shadcn/ui + Radix primitives      |
| Notifications | Sonner (toasts)                                  |

Business logic runs in Next.js **server actions**, and access to every table is
protected by Postgres **row-level security** so users only ever see their own data.

---

## Getting started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (test mode is fine)
- A [Resend](https://resend.com) account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable                        | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) key                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service-role key (server-only, used by the webhook) |
| `RESEND_API_KEY`                | Resend API key                                      |
| `RESEND_FROM_EMAIL`             | Verified "from" address for reminder emails         |
| `STRIPE_SECRET_KEY`             | Stripe secret key                                   |
| `STRIPE_WEBHOOK_SECRET`         | Signing secret for the Stripe webhook               |
| `STRIPE_PRICE_ID`               | Price ID for the subscription plan                  |
| `STRIPE_TRIAL_DAYS`             | Free-trial length in days (`0` to disable)          |
| `NEXT_PUBLIC_APP_URL`           | Base URL of the app (used for Stripe redirects)     |

### 3. Set up the database

Run the SQL in `supabase/schema.sql` (tables + RLS policies) and `supabase/storage.sql`
(the `contracts` storage bucket) against your Supabase project.

### 4. Run the app

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

To receive Stripe webhook events locally, forward them to the webhook route:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Project structure

```
app/
  (protected)/dashboard/   Protected dashboard: clients, contracts, invoices, billing
  api/stripe/webhook/      Stripe webhook handler
  login/                   Magic-link sign-in
lib/
  billing/                 Subscription status + freemium limit rules
  email/                   Invoice reminder email builder
  money.ts                 Currency parsing (string -> integer cents)
  stripe/ · supabase/      Server/browser/admin clients
  i18n/                    Typed translation layer
supabase/                  SQL schema, RLS policies, storage setup
```

---

## Available scripts

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Start the development server                     |
| `npm run build`        | Production build                                 |
| `npm run start`        | Serve the production build                       |
| `npm run lint`         | Run ESLint                                       |
| `npm run typecheck`    | Type-check with TypeScript (`tsc --noEmit`)      |
| `npm run format`       | Format the codebase with Prettier                |
| `npm run format:check` | Check formatting without writing (useful in CI)  |
| `npm run db:types`     | Regenerate `lib/supabase/types.ts` from Supabase |
