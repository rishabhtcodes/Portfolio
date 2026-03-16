import { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ contact }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!emailPattern.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const links = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
      logo: 'https://cdn.simpleicons.org/gmail/EA4335',
      logoClass: 'h-6 w-6',
    },
    {
      label: 'LinkedIn',
      value: contact.linkedinLabel,
      href: contact.linkedin,
      icon: Linkedin,
      logo: 'https://img.icons8.com/color/48/linkedin.png',
      logoClass: 'h-8 w-8',
    },
    {
      label: 'GitHub',
      value: contact.githubLabel,
      href: contact.github,
      icon: Github,
      logo: 'https://cdn.simpleicons.org/github/FFFFFF',
      logoClass: 'h-6 w-6',
    },
  ];

  return (
    <motion.section
      id="contact"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Let&apos;s build something polished, useful, and production-ready.</h2>
          <p className="section-copy">{contact.copy}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  title={link.label}
                  className="glass-panel flex h-20 w-20 items-center justify-center rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-sky-300/25 hover:bg-white/8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
                    {link.logo ? (
                      <img src={link.logo} alt={`${link.label} logo`} className={`${link.logoClass ?? 'h-6 w-6'} object-contain`} loading="lazy" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          <a href={`mailto:${contact.email}`} className="primary-button mt-6">
            Contact Button
          </a>
        </div>

        <form onSubmit={handleSubmit} noValidate className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/40"
                placeholder="Your name"
              />
              {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/40"
                placeholder="you@example.com"
              />
              {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300/40"
                placeholder="Tell me about the project or role."
              />
              {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message}</p> : null}
            </div>

            <button type="submit" className="primary-button w-full sm:w-fit">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </button>

            {submitted ? <p className="text-sm text-emerald-300">Message validated. Connect this form to EmailJS, Formspree, or your backend when ready.</p> : null}
          </div>
        </form>
      </div>
    </motion.section>
  );
}
