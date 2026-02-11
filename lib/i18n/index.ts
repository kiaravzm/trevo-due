import { en, type Messages } from "./messages/en";

const messages: Messages = en;

function getNested(obj: object, path: string): string | object | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current as string | object | undefined;
}

/**
 * Get a localized string by key. Supports nested keys (e.g. "invoice.status.paid")
 * and interpolation: t("client.deleteDescription", { name: "Acme" }) replaces {name} in the string.
 */
export function t(
  key: string,
  params?: Record<string, string | number>
): string {
  const value = getNested(messages, key);
  if (typeof value !== "string") {
    return key;
  }
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
    const v = params[paramKey];
    return v !== undefined ? String(v) : `{${paramKey}}`;
  });
}

/**
 * Get invoice status label. DB value "open" is displayed as "Pending".
 */
export function invoiceStatusLabel(status: string): string {
  const key =
    status in messages.invoice.status ? `invoice.status.${status}` : "invoice.status.open";
  return t(key);
}

/**
 * Get contract status label.
 */
export function contractStatusLabel(status: string): string {
  const key =
    status in messages.contract.status
      ? `contract.status.${status}`
      : "contract.status.signed";
  return t(key);
}

export { en as messagesEn };
export type { Messages };
