import nodemailer from 'nodemailer';
import { resolve4 } from 'dns/promises';

async function createTransport() {
  const [smtpIp] = await resolve4('smtp.gmail.com');

  return nodemailer.createTransport({
    host: smtpIp,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'rishabhtiwari3538@gmail.com',
      pass: 'rpnjafmdmibfcnje',
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 5_000,
    greetingTimeout:   3_000,
    socketTimeout:     5_000,
  });
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
  const transporter = await createTransport(); // resolves Gmail IPv4 before connecting

  const OWNER_EMAIL = 'rishabhtiwari3538@gmail.com';
  const OWNER_NAME  = 'Rishabh Tiwari';
  const OWNER_TITLE = 'Full Stack Developer';
  const SITE_URL    = 'https://rishabhtcodes.vercel.app';

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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b251d; max-width: 600px; margin: 0 auto;">
      <div style="background: #794422; color: white; padding: 18px 24px; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0; font-size: 18px;">📩 New Portfolio Contact Submission</h2>
      </div>
      <div style="padding: 20px; border: 1px solid #d4cbb8; border-top: none; border-radius: 0 0 10px 10px; background: #fbf8f1;">
        <p style="margin-top: 0; color: #6b6255;">A visitor submitted a new contact form from your portfolio.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8; background: #f5f0e6;"><strong>Name</strong></td>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8; background: #f5f0e6;"><strong>Email</strong></td>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8; background: #f5f0e6;"><strong>Submitted</strong></td>
            <td style="padding: 8px 12px; border: 1px solid #d4cbb8;">${submittedAt}</td>
          </tr>
        </table>
        <p><strong>Message</strong></p>
        <div style="padding: 14px; border: 1px solid #d4cbb8; border-radius: 8px; background: #f5f0e6;">${safeMessage}</div>
      </div>
    </div>
  `;

  const ownerText = `New Portfolio Contact Submission\n\nName: ${name}\nEmail: ${email}\nSubmitted: ${submittedAt}\n\nMessage:\n${message}`;

  const userHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b251d; max-width: 600px; margin: 0 auto;">
      <div style="border: 1px solid #d4cbb8; border-radius: 12px; overflow: hidden; background: #fbf8f1;">
        <div style="background: linear-gradient(90deg, #794422, #5c3217); color: white; padding: 18px 24px;">
          <h2 style="margin: 0; font-size: 20px;">Thank you for contacting me</h2>
        </div>
        <div style="padding: 24px; background: #fbf8f1;">
          <p style="margin-top: 0;">Hi <strong>${safeName}</strong>,</p>
          <p>I received your message from my portfolio website. Thank you for reaching out.</p>
          <p>I will review your message and get back to you <strong>within 24–48 hours</strong>.</p>
          <p style="margin-top: 16px; margin-bottom: 8px;"><strong>Your submitted details:</strong></p>
          <ul style="padding-left: 20px; margin-top: 4px;">
            <li style="margin-bottom: 4px;"><strong>Name:</strong> ${safeName}</li>
            <li style="margin-bottom: 4px;"><strong>Email:</strong> <span style="color: #794422;">${safeEmail}</span></li>
            <li style="margin-bottom: 4px;"><strong>Submitted:</strong> ${submittedAt}</li>
          </ul>
          <div style="padding: 14px; border: 1px solid #d4cbb8; border-radius: 8px; background: #f5f0e6; margin-top: 16px;">
            <strong style="color: #794422;">Your Message:</strong>
            <p style="margin: 8px 0 0 0;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px; line-height: 1.4;">Best regards,<br/><strong style="color: #794422;">${escapeHtml(OWNER_NAME)}</strong><br/><span style="color: #6b6255;">${escapeHtml(OWNER_TITLE)}</span></p>
          <p style="margin-top: 16px;"><a href="${SITE_URL}" style="display: inline-block; padding: 10px 22px; background: #794422; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Portfolio</a></p>
        </div>
      </div>
    </div>
  `;

  const userText = `Hi ${name},\n\nThank you for contacting me. I received your message and I will get back to you within 24-48 hours.\n\nBest regards,\n${OWNER_NAME}\n${OWNER_TITLE}\n${SITE_URL}`;

  const sender = `"Rishabh Tiwari" <${OWNER_EMAIL}>`;

  await Promise.all([
    transporter.sendMail({
      from: sender,
      to:   OWNER_EMAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: ownerText,
      html: ownerHtml,
    }),
    transporter.sendMail({
      from:    sender,
      to:      email,
      subject: `Thanks for contacting me, ${name} — I will reach you soon`,
      text: userText,
      html: userHtml,
    }),
  ]);
}
