import Link from "next/link";
import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UserSummary } from "../user-summary";

export const metadata: Metadata = {
  title: "Settings | AgencyDocs",
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
          <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your billing and account information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                {isActive
                  ? "Your subscription is active."
                  : "Manage your plan and payment method."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription?.current_period_end && isActive && (
                <p className="text-sm text-muted-foreground">
                  Current period ends on{" "}
                  {new Date(subscription.current_period_end).toLocaleDateString("en-US")}.
                </p>
              )}
              <Button asChild size="sm">
                <Link href="/dashboard/billing">Manage subscription</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>User information</CardTitle>
              <CardDescription>Your account details.</CardDescription>
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
