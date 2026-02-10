import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "@/lib/billing/subscription";

import { InvoiceCreateForm } from "./invoice-create-form";
import { InvoiceListItem } from "./invoice-list-item";
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
  const limitReached = subscriptionStatus === "inactive" && invoiceCount >= 3;

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Track billing details with clear status, dates, and amounts.
          </p>
        </div>

        {limitReached ? (
          <PaywallCard
            title="You've reached the free invoice limit"
            description="Upgrade to create unlimited invoices and keep billing moving."
          />
        ) : (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Create invoice</CardTitle>
              <CardDescription>
                Use consistent numbers and status to keep clients aligned.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceCreateForm customers={customers ?? []} />
            </CardContent>
          </Card>
        )}

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Saved invoices</CardTitle>
            <CardDescription>Edit fields quickly and keep records accurate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices && invoices.length > 0 ? (
              <>
                <div className="hidden grid-cols-[1fr,1fr,1fr,1fr,1fr,auto] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
                  <span>Number</span>
                  <span>Status</span>
                  <span>Amount</span>
                  <span>Due date</span>
                  <span>Client</span>
                  <span className="w-10" aria-hidden />
                </div>
                {invoices.map((invoice) => (
                  <InvoiceListItem
                    key={invoice.id}
                    invoice={invoice}
                    customers={customers ?? []}
                  />
                ))}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No invoices yet. Create the first one above.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
