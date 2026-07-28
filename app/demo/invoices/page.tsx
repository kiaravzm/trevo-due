import { t } from "@/lib/i18n";
import { demoCustomerOptions, demoInvoices } from "@/lib/demo/fixtures";
import { InvoicesCard } from "@/app/(protected)/dashboard/invoices/invoices-card";

export default function DemoInvoicesPage() {
  const invoices = demoInvoices.map((invoice) => ({ ...invoice }));

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("invoice.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("invoice.pageDescription")}</p>
        </div>

        <InvoicesCard
          invoices={invoices}
          customers={[...demoCustomerOptions]}
          limitReached
        />
      </section>
    </main>
  );
}
