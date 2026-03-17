import nodemailer from 'nodemailer';

function getMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER, and SMTP_PASS are required for sending emails.');
  }

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactEmails({ name, email, message }) {
  const transporter = nodemailer.createTransport(getMailConfig());
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
  const fromEmail = process.env.MAIL_FROM || process.env.SMTP_USER;
  const portfolioOwnerName = process.env.PORTFOLIO_OWNER_NAME || 'Rishabh Kumar Tiwari';
  const portfolioOwnerTitle = process.env.PORTFOLIO_OWNER_TITLE || 'Full Stack Developer';
  const portfolioSiteUrl = process.env.PORTFOLIO_SITE_URL || '';
  const replyEta = process.env.CONTACT_REPLY_WINDOW || 'within 24-48 hours';

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>');
  const submittedAt = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 8px;">New Portfolio Contact Submission</h2>
      <p style="margin-top: 0; color: #475569;">A visitor submitted a new contact form from your portfolio.</p>
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Name</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">${safeEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>Submitted</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">${submittedAt}</td>
        </tr>
      </table>
      <p><strong>Message</strong></p>
      <div style="padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc;">${safeMessage}</div>
    </div>
  `;

  const ownerText = `New Portfolio Contact Submission\n\nName: ${name}\nEmail: ${email}\nSubmitted: ${submittedAt}\n\nMessage:\n${message}`;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 620px; margin: 0 auto;">
      <div style="border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #0ea5e9, #6366f1); color: white; padding: 16px 20px;">
          <h2 style="margin: 0; font-size: 20px;">Thank you for contacting me</h2>
        </div>
        <div style="padding: 20px; background: #ffffff;">
          <p>Hi ${safeName},</p>
          <p>I received your message from my portfolio website. Thank you for reaching out.</p>
          <p>I will review your message and get back to you ${replyEta}.</p>
          <p><strong>Your submitted details:</strong></p>
          <ul style="padding-left: 20px;">
            <li><strong>Name:</strong> ${safeName}</li>
            <li><strong>Email:</strong> ${safeEmail}</li>
            <li><strong>Submitted:</strong> ${submittedAt}</li>
          </ul>
          <div style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
            <strong>Your Message:</strong>
            <p style="margin-bottom: 0;">${safeMessage}</p>
          </div>
          <p style="margin-top: 20px;">Best regards,<br/>${escapeHtml(portfolioOwnerName)}<br/>${escapeHtml(portfolioOwnerTitle)}</p>
          ${portfolioSiteUrl ? `<p style="margin-top: 12px;"><a href="${escapeHtml(portfolioSiteUrl)}">Visit Portfolio</a></p>` : ''}
        </div>
      </div>
    </div>
  `;

  const userText = `Hi ${name},\n\nThank you for contacting me. I received your message and I will get back to you ${replyEta}.\n\nSubmitted details:\n- Name: ${name}\n- Email: ${email}\n- Submitted: ${submittedAt}\n\nYour message:\n${message}\n\nBest regards,\n${portfolioOwnerName}\n${portfolioOwnerTitle}${portfolioSiteUrl ? `\n${portfolioSiteUrl}` : ''}`;

  await transporter.sendMail({
    from: fromEmail,
    to: receiverEmail,
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    text: ownerText,
    html: ownerHtml,
  });

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: `Thanks for contacting me, ${name} - I will reach you soon`,
    text: userText,
    html: userHtml,
  });
}
