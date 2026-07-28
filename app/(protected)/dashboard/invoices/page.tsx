import { t } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "@/lib/billing/subscription";
import { hasReachedFreeLimit } from "@/lib/billing/limits";

import { InvoicesCard } from "./invoices-card";
import { PaywallCard } from "../billing/paywall-card";

export default async function InvoicesPage() {
  const subscriptionStatus = await getSubscriptionStatus();
  const supabase = createSupabaseServerClient();
  const { count } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true });
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: invoices } = await supabase
    .from("invoices")
    .select(
      "id, number, status, amount_cents, currency, due_date, customer_id, reminders_enabled"
    )
    .order("created_at", { ascending: false });

  const invoiceCount = count ?? 0;
  const limitReached = hasReachedFreeLimit(subscriptionStatus, invoiceCount);

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("invoice.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("invoice.pageDescription")}
          </p>
        </div>

        {limitReached && (
          <PaywallCard
            title={t("invoice.invoiceLimitReachedTitle")}
            description={t("invoice.invoiceLimitReachedDescription")}
          />
        )}

        <InvoicesCard
          invoices={invoices}
          customers={customers ?? []}
          limitReached={limitReached}
        />
      </section>
    </main>
  );
}
