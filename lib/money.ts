/**
 * Parses a user-typed monetary amount into an integer number of cents.
 *
 * Accepts either a dot or a comma as the decimal separator (e.g. "12.50" or
 * "12,50") with up to two decimal places. Returns `null` when the input is not
 * a valid amount so callers can surface a validation error instead of storing a
 * corrupt value.
 */
export function parseCurrencyToCents(value: string): number | null {
  const normalized = value.replace(",", ".").trim();
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, decimals = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(decimals.padEnd(2, "0"));
  return Number.isNaN(cents) ? null : cents;
}
