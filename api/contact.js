import nodemailer from 'nodemailer';
import { resolve4 } from 'dns/promises';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  // Basic validation
  if (!name?.trim()) return res.status(400).json({ message: 'Name is required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '')))
    return res.status(400).json({ message: 'A valid email is required.' });
  if (!message || String(message).trim().length < 10)
    return res.status(400).json({ message: 'Message must be at least 10 characters.' });

  try {
    // Resolve Gmail IPv4 explicitly — avoids any IPv6 preference
    const [smtpIp] = await resolve4('smtp.gmail.com');

    const transporter = nodemailer.createTransport({
      host:   smtpIp,
      port:   587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'rishabhtiwari3538@gmail.com',
        pass: process.env.SMTP_PASS || 'rpnjafmdmibfcnje',
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 15_000,
      greetingTimeout:   10_000,
    });

    const OWNER   = 'rishabhtiwari3538@gmail.com';
    const SITE    = 'https://rishabhtcodes.vercel.app';
    const safeName    = String(name).trim();
    const safeEmail   = String(email).trim();
    const safeMessage = String(message).trim();
    const submittedAt = new Date().toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });

    // 1️⃣ Email to owner — contains full details of the sender
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${OWNER}>`,
      to:      OWNER,
      replyTo: safeEmail,
      subject: `📩 Portfolio Contact: ${safeName}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
          <h2 style="margin-bottom:8px">New Portfolio Message</h2>
          <p style="color:#475569">Someone contacted you via your portfolio.</p>
          <table style="border-collapse:collapse;width:100%;margin:16px 0">
            <tr><td style="padding:8px;border:1px solid #cbd5e1"><strong>Name</strong></td><td style="padding:8px;border:1px solid #cbd5e1">${safeName}</td></tr>
            <tr><td style="padding:8px;border:1px solid #cbd5e1"><strong>Email</strong></td><td style="padding:8px;border:1px solid #cbd5e1">${safeEmail}</td></tr>
            <tr><td style="padding:8px;border:1px solid #cbd5e1"><strong>Time</strong></td><td style="padding:8px;border:1px solid #cbd5e1">${submittedAt}</td></tr>
          </table>
          <p><strong>Message:</strong></p>
          <div style="padding:12px;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;white-space:pre-wrap">${safeMessage}</div>
        </div>
      `,
    });

    // 2️⃣ Auto-reply to sender
    await transporter.sendMail({
      from:    `"Rishabh Kumar Tiwari" <${OWNER}>`,
      to:      safeEmail,
      subject: `Thanks for reaching out, ${safeName}!`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(90deg,#3452e0,#7d94ff);color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
            <h2 style="margin:0">Thanks for contacting me!</h2>
          </div>
          <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px">
            <p>Hi ${safeName},</p>
            <p>I received your message and will get back to you <strong>within 24–48 hours</strong>.</p>
            <blockquote style="margin:16px 0;padding:12px 16px;border-left:4px solid #3452e0;background:#f8fafc;border-radius:0 8px 8px 0">
              ${safeMessage}
            </blockquote>
            <p style="margin-top:24px">Best regards,<br><strong>Rishabh Kumar Tiwari</strong><br>Full Stack Developer</p>
            <a href="${SITE}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#3452e0;color:#fff;text-decoration:none;border-radius:8px">Visit Portfolio</a>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ message: error.message || 'Failed to send message.' });
  }
}
