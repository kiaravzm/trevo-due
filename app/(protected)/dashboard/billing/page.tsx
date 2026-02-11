import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { CheckoutForm } from "./checkout-form";

type BillingPageProps = {
  searchParams?: { status?: string };
};

function StatusMessage({ status }: { status?: string }) {
  if (status === "success") {
    return (
      <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
        {t("billing.subscriptionStarted")}
      </p>
    );
  }

  if (status === "cancel") {
    return (
      <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
        {t("billing.checkoutCanceled")}
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        {t("billing.somethingWentWrong")}
      </p>
    );
  }

  return null;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const supabase = createSupabaseServerClient();
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end, trial_ends_at")
    .maybeSingle();

  const trialInfo = subscription?.trial_ends_at
    ? t("billing.trialEndsOn", { date: new Date(subscription.trial_ends_at).toLocaleDateString("en-US") })
    : t("billing.startTrial");

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("billing.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("billing.description")}
          </p>
        </div>

        <StatusMessage status={searchParams?.status} />

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t("billing.agencyDocsMonthly")}</CardTitle>
            <CardDescription>
              {trialInfo}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("billing.unlimitedClientsContractsInvoices")}</li>
              <li>{t("billing.privateStorage")}</li>
              <li>{t("billing.secureReminders")}</li>
            </ul>

            {subscription?.status === "active" ? (
              <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                {t("billing.subscriptionActive")}
              </p>
            ) : (
              <CheckoutForm />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
