import { t } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "@/lib/billing/subscription";

import { ContractsCard } from "./contracts-card";
import { PaywallCard } from "../billing/paywall-card";

export default async function ContractsPage() {
  const subscriptionStatus = await getSubscriptionStatus();
  const supabase = createSupabaseServerClient();
  const { count } = await supabase
    .from("contracts")
    .select("id", { count: "exact", head: true });
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, title, status, customer_id, file_path")
    .order("created_at", { ascending: false });

  const contractCount = count ?? 0;
  const limitReached = subscriptionStatus === "inactive" && contractCount >= 3;

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("contract.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("contract.uploadSignedDescription")}
          </p>
        </div>

        {limitReached && (
          <PaywallCard
            title={t("contract.contractLimitReachedTitle")}
            description={t("contract.contractLimitReachedDescription")}
          />
        )}

        <ContractsCard
          contracts={contracts}
          customers={customers ?? []}
          limitReached={limitReached}
        />
      </section>
    </main>
  );
}
