import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { CheckoutForm } from "./checkout-form";

type BillingPageProps = {
  searchParams?: { status?: string };
};

function StatusMessage({ status }: { status?: string }) {
  if (status === "success") {
    return (
      <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
        Subscription started. Your access is ready.
      </p>
    );
  }

  if (status === "cancel") {
    return (
      <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
        Checkout canceled. You can resume anytime.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Something went wrong. Please try again.
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
    ? `Trial ends on ${new Date(subscription.trial_ends_at).toLocaleDateString("en-US")}`
    : "Start a trial to explore every feature before billing.";

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Simple monthly pricing with a clear trial window. No surprises.
          </p>
        </div>

        <StatusMessage status={searchParams?.status} />

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>AgencyDocs Monthly</CardTitle>
            <CardDescription>
              {trialInfo}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Unlimited clients, contracts, and invoices</li>
              <li>Private storage for signed agreements</li>
              <li>Secure reminders and billing controls</li>
            </ul>

            {subscription?.status === "active" ? (
              <p className="rounded-md border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                Your subscription is active.
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
