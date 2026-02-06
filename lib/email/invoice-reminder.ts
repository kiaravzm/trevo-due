type InvoiceReminderPayload = {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  dueDate: string | null;
  senderName: string;
};

export function buildInvoiceReminderEmail(payload: InvoiceReminderPayload) {
  const { clientName, invoiceNumber, amount, dueDate, senderName } = payload;
  const dueLine = dueDate ? `Due date: ${dueDate}` : "Due date: not specified";

  const subject = `Friendly reminder: Invoice ${invoiceNumber}`;
  const text = `Hi ${clientName},

I hope you are doing well. This is a gentle reminder about invoice ${invoiceNumber} for ${amount}.
${dueLine}

If you have any questions or need another copy, just let me know. Thank you for your partnership.

Best regards,
${senderName}`;

  const html = `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <p>Hi ${clientName},</p>
    <p>
      I hope you are doing well. This is a gentle reminder about invoice
      <strong>${invoiceNumber}</strong> for <strong>${amount}</strong>.
    </p>
    <p>${dueLine}</p>
    <p>
      If you have any questions or need another copy, just let me know.
      Thank you for your partnership.
    </p>
    <p>Best regards,<br/>${senderName}</p>
  </div>
  `;

  return { subject, text, html };
}
