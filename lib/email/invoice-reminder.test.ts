import { describe, it, expect } from "vitest";
import { buildInvoiceReminderEmail } from "./invoice-reminder";

describe("buildInvoiceReminderEmail", () => {
  const getMessage = (key: string, params?: Record<string, string>) => {
    if (params) {
      return `${key} ${JSON.stringify(params)}`;
    }
    return key;
  };

  const basePayload = {
    clientName: "Ada Lovelace",
    invoiceNumber: "INV-100",
    amount: "USD 150.00",
    dueDate: "2026-08-01" as string | null,
    senderName: "TrevoDue",
  };

  it("builds a subject that includes the invoice number", () => {
    const { subject } = buildInvoiceReminderEmail(basePayload, getMessage);
    expect(subject).toContain("email.reminderSubject");
    expect(subject).toContain("INV-100");
  });

  it("includes the due date line when dueDate is provided", () => {
    const { text, html } = buildInvoiceReminderEmail(basePayload, getMessage);

    expect(text).toContain("email.reminderDueDate");
    expect(html).toContain("email.reminderDueDate");
  });

  it("uses the not-specified due date message when dueDate is null", () => {
    const { text } = buildInvoiceReminderEmail({ ...basePayload, dueDate: null }, getMessage);

    expect(text).toContain("email.reminderDueDateNotSpecified");
    expect(text).not.toContain('"date"');
  });

  it("includes client name and sender name in the email body", () => {
    const { text, html } = buildInvoiceReminderEmail(basePayload, getMessage);

    expect(text).toContain("email.reminderHi");
    expect(text).toContain("Ada Lovelace");
    expect(text).toContain("TrevoDue");
    expect(text).toContain("TrevoDue");
  });

  it("wraps invoice number and amount in <strong> in the html version", () => {
    const { html } = buildInvoiceReminderEmail(basePayload, getMessage);

    expect(html).toContain("<strong>INV-100</strong>");
    expect(html).toContain("<strong>USD 150.00</strong>");
  });
});
