import nodemailer from 'nodemailer';
import { resolve4 } from 'dns/promises';

async function createTransport() {
  // Resolve smtp.gmail.com to IPv4 explicitly — Render's network blocks IPv6 to Gmail
  const [smtpIp] = await resolve4('smtp.gmail.com');

  return nodemailer.createTransport({
    host: smtpIp,      // actual IPv4 like 142.250.x.x — never IPv6
    port: 587,         // STARTTLS — port 465 SSL is blocked on Render free tier
    secure: false,     // false = STARTTLS (upgrades to TLS after connecting)
    requireTLS: true,  // reject if server doesn't support TLS
    auth: {
      user: 'rishabhtiwari3538@gmail.com',
      pass: 'rpnjafmdmibfcnje',
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 20_000,
    greetingTimeout:   10_000,
    socketTimeout:     20_000,
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
  const OWNER_NAME  = 'Rishabh Kumar Tiwari';
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
          <p>I will review your message and get back to you within 24–48 hours.</p>
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
          <p style="margin-top: 20px;">Best regards,<br/>${escapeHtml(OWNER_NAME)}<br/>${escapeHtml(OWNER_TITLE)}</p>
          <p style="margin-top: 12px;"><a href="${SITE_URL}">Visit Portfolio</a></p>
        </div>
      </div>
    </div>
  `;

  const userText = `Hi ${name},\n\nThank you for contacting me. I received your message and I will get back to you within 24-48 hours.\n\nBest regards,\n${OWNER_NAME}\n${OWNER_TITLE}\n${SITE_URL}`;

  await transporter.sendMail({
    from: OWNER_EMAIL,
    to:   OWNER_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${name}`,
    text: ownerText,
    html: ownerHtml,
  });

  await transporter.sendMail({
    from:    OWNER_EMAIL,
    to:      email,
    subject: `Thanks for contacting me, ${name} — I will reach you soon`,
    text: userText,
    html: userHtml,
  });
}
