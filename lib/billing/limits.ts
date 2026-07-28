import type { SubscriptionStatus } from "./subscription";

/** Maximum number of records (invoices or contracts) allowed on the free plan. */
export const FREE_PLAN_LIMIT = 3;

/**
 * Business rule for the freemium gate: whether a user has hit the free-plan cap.
 *
 * Paying (`active`) and `trialing` users are never limited. Everyone else is
 * blocked once they reach {@link FREE_PLAN_LIMIT} records. Kept as a pure
 * function of (status, count) so the rule can be unit-tested without a database.
 */
export function hasReachedFreeLimit(
  subscriptionStatus: SubscriptionStatus,
  currentCount: number,
): boolean {
  if (subscriptionStatus === "active" || subscriptionStatus === "trialing") {
    return false;
  }

  return currentCount >= FREE_PLAN_LIMIT;
}
