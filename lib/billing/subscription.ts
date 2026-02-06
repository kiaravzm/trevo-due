import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SubscriptionStatus = "active" | "trialing" | "inactive";

export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("status, trial_ends_at")
    .maybeSingle();

  if (!data) {
    return "inactive";
  }

  if (data.status === "active" || data.status === "trialing") {
    return data.status;
  }

  return "inactive";
}
