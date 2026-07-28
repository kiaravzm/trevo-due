import { t } from "@/lib/i18n";
import { demoContracts, demoCustomerOptions } from "@/lib/demo/fixtures";
import { ContractsCard } from "@/app/(protected)/dashboard/contracts/contracts-card";

export default function DemoContractsPage() {
  const contracts = demoContracts.map((contract) => ({ ...contract }));

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("contract.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("contract.uploadSignedDescription")}</p>
        </div>

        <ContractsCard contracts={contracts} customers={[...demoCustomerOptions]} limitReached />
      </section>
    </main>
  );
}
