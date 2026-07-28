type InvoiceReminderPayload = {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string | null;
  senderName: string;
};

type TranslateFn = (key: string, params?: Record<string, string>) => string;

export function buildInvoiceReminderEmail(
  payload: InvoiceReminderPayload,
  getMessage: TranslateFn,
) {
  const { clientName, invoiceNumber, amount, dueDate, senderName } = payload;
  const dueLine = dueDate
    ? getMessage("email.reminderDueDate", { date: dueDate })
    : getMessage("email.reminderDueDateNotSpecified");

  const subject = getMessage("email.reminderSubject", { number: invoiceNumber });
  const intro = getMessage("email.reminderBodyIntro", {
    number: invoiceNumber,
    amount,
  });
  const outro = getMessage("email.reminderBodyOutro");
  const bestRegards = getMessage("email.reminderBestRegards");
  const hi = getMessage("email.reminderHi", { name: clientName });

  const text = `${hi}

${intro}
${dueLine}

${outro}

${bestRegards},
${senderName}`;

  const introHtml = intro
    .replace(/\n/g, " ")
    .replace(invoiceNumber, `<strong>${invoiceNumber}</strong>`)
    .replace(amount, `<strong>${amount}</strong>`);
  const html = `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <p>${hi}</p>
    <p>${introHtml}</p>
    <p>${dueLine}</p>
    <p>${outro}</p>
    <p>${bestRegards},<br/>${senderName}</p>
  </div>
  `;

  return { subject, text, html };
}
