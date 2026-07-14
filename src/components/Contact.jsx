import { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle } from 'lucide-react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ contact }) {
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [errors, setErrors]           = useState({});
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim())               e.name    = 'Name is required.';
    if (!emailPattern.test(formData.email))  e.email   = 'Enter a valid email address.';
    if (formData.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((c) => ({ ...c, [name]: value }));
    setSubmitted(false);
    setSubmitError('');
    setErrors((c) => ({ ...c, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setSubmitError(''); setSending(true);

    try {
      // Calls Vercel serverless function — avoids Render SMTP port blocking
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send.');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError(error.message || 'Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { label: 'Email',    href: `mailto:${contact.email}`, icon: Mail },
    { label: 'LinkedIn', href: contact.linkedin,           icon: Linkedin },
    { label: 'GitHub',   href: contact.github,             icon: Github },
  ];

  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-grid">
          {/* Left */}
          <div>
            <span className="eyebrow" id="contactEyebrow">Contact</span>
            <h2 className="section-title" id="contactTitle">
              Let&apos;s build something polished, useful, and production-ready.
            </h2>
            <p className="section-desc" id="contactDesc">{contact.copy}</p>
            <div className="contact-links" id="contactLinks">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  title={label} aria-label={label} className="icon-btn">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} noValidate className="panel form-panel">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500" />
                <p className="font-semibold text-lg" style={{ color: 'var(--green)' }}>
                  Message sent!
                </p>
                <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
                  I&apos;ll get back to you within 24–48 hours. Check your inbox for a confirmation.
                </p>
                <button type="button" className="btn btn-secondary mt-2"
                  onClick={() => setSubmitted(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text"
                    value={formData.name} onChange={handleChange} placeholder="Your name" />
                  {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email"
                    value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message"
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell me about the project or role..." />
                  {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
                </div>

                <button type="submit" disabled={sending}
                  className="btn btn-primary btn-block disabled:cursor-not-allowed disabled:opacity-60">
                  <Send className="mr-2 h-4 w-4" />
                  {sending ? 'Sending…' : 'Send Message'}
                </button>

                {submitError && (
                  <p className="text-xs text-rose-500 mt-2">{submitError}</p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
