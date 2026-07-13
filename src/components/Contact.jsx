import { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiRequest } from '../lib/api';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ contact }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required.';
    if (!emailPattern.test(formData.email)) e.email = 'Enter a valid email address.';
    if (formData.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((c) => ({ ...c, [name]: value }));
    setSubmitted(false); setSubmitError('');
    setErrors((c) => ({ ...c, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({}); setSubmitError(''); setSending(true);
    try {
      await apiRequest('/api/contact/send', { method: 'POST', body: formData });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitted(false);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { label: 'Email', href: `mailto:${contact.email}`, icon: Mail, bg: 'bg-rose-50', color: 'text-rose-600', border: 'border-rose-100' },
    { label: 'LinkedIn', href: contact.linkedin, icon: Linkedin, bg: 'bg-blue-50', color: 'text-blue-600', border: 'border-blue-100' },
    { label: 'GitHub', href: contact.github, icon: Github, bg: 'bg-slate-100', color: 'text-slate-700', border: 'border-slate-200' },
  ];

  return (
    <motion.section
      id="contact"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">

        {/* Left — copy + social */}
        <div>
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Let&apos;s build something polished, useful, and production-ready.</h2>
          <p className="section-copy">{contact.copy}</p>

          <div className="mt-8 flex gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  title={link.label}
                  aria-label={link.label}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${link.bg} ${link.color} ${link.border} shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="glass-panel p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                placeholder="Tell me about the project or role."
              />
              {errors.message && <p className="mt-1.5 text-xs text-rose-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="mr-2 h-4 w-4" />
              {sending ? 'Sending…' : 'Send Message'}
            </button>

            {submitError && <p className="text-xs text-rose-500">{submitError}</p>}
            {submitted && <p className="text-xs font-medium text-emerald-600">✓ Message sent! I&apos;ll get back to you soon.</p>}
          </div>
        </form>
      </div>
    </motion.section>
  );
}
