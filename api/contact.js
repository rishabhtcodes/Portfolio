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

    const SENDER = `"Rishabh Tiwari" <${OWNER}>`;

    // 1️⃣ Send both owner email and auto-reply confirmation email in parallel for fast response
    await Promise.all([
      transporter.sendMail({
        from:    SENDER,
        to:      OWNER,
        replyTo: safeEmail,
        subject: `📩 Portfolio Contact: ${safeName}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#2b251d;line-height:1.6;max-width:600px;margin:0 auto">
            <div style="background:#794422;color:#ffffff;padding:18px 24px;border-radius:10px 10px 0 0">
              <h2 style="margin:0;font-size:18px;font-weight:700">📩 New Portfolio Message</h2>
            </div>
            <div style="padding:20px;border:1px solid #d4cbb8;border-top:none;border-radius:0 0 10px 10px;background:#fbf8f1">
              <p style="color:#6b6255;margin-top:0">Someone sent you a message from your portfolio.</p>
              <table style="border-collapse:collapse;width:100%;margin:16px 0">
                <tr><td style="padding:8px 12px;border:1px solid #d4cbb8;background:#f5f0e6"><strong>Name</strong></td><td style="padding:8px 12px;border:1px solid #d4cbb8">${safeName}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid #d4cbb8;background:#f5f0e6"><strong>Email</strong></td><td style="padding:8px 12px;border:1px solid #d4cbb8">${safeEmail}</td></tr>
                <tr><td style="padding:8px 12px;border:1px solid #d4cbb8;background:#f5f0e6"><strong>Submitted</strong></td><td style="padding:8px 12px;border:1px solid #d4cbb8">${submittedAt}</td></tr>
              </table>
              <p><strong>Message:</strong></p>
              <div style="padding:14px;border:1px solid #d4cbb8;border-radius:8px;background:#f5f0e6;white-space:pre-wrap;color:#2b251d">${safeMessage}</div>
            </div>
          </div>
        `,
      }),
      transporter.sendMail({
        from:    SENDER,
        to:      safeEmail,
        subject: `Thanks for reaching out, ${safeName}!`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#2b251d;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(90deg,#794422,#5c3217);color:#ffffff;padding:20px 24px;border-radius:12px 12px 0 0">
              <h2 style="margin:0;font-size:20px;font-weight:700">Thank you for contacting me</h2>
            </div>
            <div style="padding:24px;border:1px solid #d4cbb8;border-top:none;border-radius:0 0 12px 12px;background:#fbf8f1">
              <p style="margin-top:0">Hi <strong>${safeName}</strong>,</p>
              <p>I received your message from my portfolio website. Thank you for reaching out.</p>
              <p>I will review your message and get back to you <strong>within 24–48 hours</strong>.</p>
              <p style="margin-top:16px;margin-bottom:8px"><strong>Your submitted details:</strong></p>
              <ul style="padding-left:20px;margin-top:4px;color:#2b251d">
                <li style="margin-bottom:4px"><strong>Name:</strong> ${safeName}</li>
                <li style="margin-bottom:4px"><strong>Email:</strong> <span style="color:#794422">${safeEmail}</span></li>
                <li style="margin-bottom:4px"><strong>Submitted:</strong> ${submittedAt}</li>
              </ul>
              <div style="padding:14px;border:1px solid #d4cbb8;border-radius:8px;background:#f5f0e6;margin-top:16px">
                <strong style="color:#794422">Your Message:</strong>
                <p style="margin:8px 0 0 0;white-space:pre-wrap;color:#2b251d">${safeMessage}</p>
              </div>
              <p style="margin-top:24px;line-height:1.4">Best regards,<br><strong style="color:#794422">Rishabh Tiwari</strong><br><span style="color:#6b6255">Full Stack Developer</span></p>
              <a href="${SITE}" style="display:inline-block;margin-top:16px;padding:10px 22px;background:#794422;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600">Visit Portfolio</a>
            </div>
          </div>
        `,
      }),
    ]);

    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ message: error.message || 'Failed to send message.' });
  }
}
