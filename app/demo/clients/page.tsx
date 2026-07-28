import { t } from "@/lib/i18n";
import { demoCustomers } from "@/lib/demo/fixtures";
import { ClientsCard } from "@/app/(protected)/dashboard/clients/clients-card";

export default function DemoClientsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("client.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("client.pageDescription")}</p>
        </div>
        <ClientsCard clients={demoCustomers.map((customer) => ({ ...customer }))} />
      </section>
    </main>
  );
}
