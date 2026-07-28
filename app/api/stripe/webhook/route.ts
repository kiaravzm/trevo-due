import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripeServerClient } from "@/lib/stripe/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type SubscriptionPayload = {
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: string;
  currentPeriodEnd: string | null;
  trialEndsAt: string | null;
};

function mapSubscriptionPayload(event: Stripe.Event): SubscriptionPayload | null {
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "customer.subscription.updated" &&
    event.type !== "customer.subscription.created" &&
    event.type !== "customer.subscription.deleted"
  ) {
    return null;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    if (!userId) return null;

    return {
      userId,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
      stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
      status: "active",
      currentPeriodEnd: null,
      trialEndsAt: null,
    };
  }

  const subscription = event.data.object as Stripe.Subscription & {
    current_period_end?: number;
    trial_end?: number;
  };
  const userId = subscription.metadata?.user_id;
  if (!userId) return null;

  return {
    userId,
    stripeCustomerId: typeof subscription.customer === "string" ? subscription.customer : null,
    stripeSubscriptionId: subscription.id,
    status: subscription.status,
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
    trialEndsAt: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
  };
}

export async function POST(request: Request) {
  const stripe = getStripeServerClient();
  const signature = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook configuration." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const payload = mapSubscriptionPayload(event);
  if (!payload) {
    return NextResponse.json({ received: true });
  }

  const admin = createSupabaseAdminClient();
  await admin.from("subscriptions").upsert(
    {
      user_id: payload.userId,
      stripe_customer_id: payload.stripeCustomerId,
      stripe_subscription_id: payload.stripeSubscriptionId,
      status: payload.status,
      current_period_end: payload.currentPeriodEnd,
      trial_ends_at: payload.trialEndsAt,
    },
    { onConflict: "user_id" },
  );

  return NextResponse.json({ received: true });
}
