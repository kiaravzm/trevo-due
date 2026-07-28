import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/lib/i18n";

type PaywallCardProps = {
  title: string;
  description: string;
};

export function PaywallCard({ title, description }: PaywallCardProps) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{t("billing.paywallNote")}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard/billing">{t("billing.seeMonthlyPlan")}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/dashboard">{t("billing.returnToDashboard")}</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{t("billing.clearPricing")}</p>
      </CardContent>
    </Card>
  );
}
