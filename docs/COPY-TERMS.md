# Copy and microcopy — terms checklist

Use this checklist in PRs and when adding new UI strings. All user-facing copy should use the centralized strings in `lib/i18n` and follow the terms below.

## Required terms (use these only)

| Term    | Use everywhere for        |
|---------|---------------------------|
| Contract | Contract documents       |
| Invoice | Invoices / billing documents |
| Paid   | Invoice status: paid      |
| Pending | Invoice/contract status: not yet paid / in progress |
| Overdue | Invoice status: past due  |
| Due date | Date when payment is due |
| Client | Customer / contact (never "Customer" in UI) |

## Forbidden terms (do not show to the user)

Do **not** use these in labels, buttons, messages, or email copy:

- **Open** — use **Pending** instead (e.g. invoice status).
- **Customer** — use **Client**.
- **Bill** — use **Invoice**.
- **Accounts receivable** / **AR**
- **Credit** / **Debit** (accounting sense)
- **Ledger** / **Journal** / **Accrual**
- **Nota fiscal** / **NF** / **Fatura** (when app is English)
- **Vencimento** — use **Due date**.
- **Outstanding** / **Receivable** (use “Pending” or “Overdue” as appropriate)

## How to use

1. **New copy:** Add the string to `lib/i18n/messages/en.ts` and use `t("key")` (or `invoiceStatusLabel` / `contractStatusLabel` for status labels).
2. **PR review:** Search the codebase for the forbidden terms above (e.g. `Open`, `Customer`, `Bill`) in `app/`, `components/`, `lib/email/` to ensure none appear in user-facing text.
3. **Consistency:** Keep status labels and entity names aligned with the required terms table.
