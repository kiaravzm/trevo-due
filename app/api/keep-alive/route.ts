import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Supabase pauses Free Plan projects after 7 days without database activity.
 * This route performs a lightweight read so a scheduled job (Vercel Cron,
 * GitHub Actions, etc.) can ping it periodically and keep the project active.
 *
 * Protected by CRON_SECRET so it can't be triggered by random traffic.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("subscriptions").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
