import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import { InvoiceCreateForm } from "./invoice-create-form";
import { InvoiceRow } from "./invoice-row";

export default async function InvoicesPage() {
  const supabase = createSupabaseServerClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("id, name")
    .order("created_at", { ascending: false });

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, number, status, amount_cents, currency, due_date, customer_id")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Track billing details with clear status, dates, and amounts.
          </p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Create invoice</CardTitle>
            <CardDescription>Use consistent numbers and status to keep clients aligned.</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceCreateForm customers={customers ?? []} />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Saved invoices</CardTitle>
            <CardDescription>Edit fields quickly and keep records accurate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} customers={customers ?? []} />
              ))
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
