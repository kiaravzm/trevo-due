import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeServerClient } from "@/lib/stripe/server";

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function POST() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json({ error: "Missing STRIPE_PRICE_ID" }, { status: 500 });
  }

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("trial_ends_at")
    .eq("user_id", user.id)
    .maybeSingle();

  const stripe = getStripeServerClient();
  const trialDaysRaw = process.env.STRIPE_TRIAL_DAYS ?? "0";
  const trialDays = Number(trialDaysRaw);
  const hasTrial = !existing?.trial_ends_at && Number.isFinite(trialDays) && trialDays > 0;

  const appUrl = getAppUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: user.email ?? undefined,
    success_url: `${appUrl}/dashboard/billing?status=success`,
    cancel_url: `${appUrl}/dashboard/billing?status=cancel`,
    subscription_data: {
      ...(hasTrial ? { trial_period_days: trialDays } : {}),
      metadata: { user_id: user.id },
    },
    metadata: {
      user_id: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
