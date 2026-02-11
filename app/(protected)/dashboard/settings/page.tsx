import Link from "next/link";
import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { t } from "@/lib/i18n";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UserSummary } from "../user-summary";

export const metadata: Metadata = {
  title: "Settings | TrevoDue",
  description: "Manage your billing and account information.",
};

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, current_period_end, trial_ends_at")
    .maybeSingle();

  const isActive = subscription?.status === "active";

  return (
    <main className="min-h-screen bg-background">
      <section className="container space-y-8 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">{t("settings.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("settings.description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t("settings.billing")}</CardTitle>
              <CardDescription>
                {isActive
                  ? t("settings.subscriptionActive")
                  : t("settings.managePlan")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription?.current_period_end && isActive && (
                <p className="text-sm text-muted-foreground">
                  {t("settings.currentPeriodEnds", {
                    date: new Date(subscription.current_period_end).toLocaleDateString("en-US"),
                  })}
                </p>
              )}
              <Button asChild size="sm">
                <Link href="/dashboard/billing">{t("settings.manageSubscription")}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>{t("settings.userInformation")}</CardTitle>
              <CardDescription>{t("settings.accountDetails")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserSummary />
              <LogoutButton variant="outline" size="sm" />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
