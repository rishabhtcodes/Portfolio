import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Github, Linkedin, Twitter, Send } from 'lucide-react';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.message.trim()) e.message = true;
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID', template_id: 'YOUR_TEMPLATE_ID', user_id: 'YOUR_PUBLIC_KEY',
          template_params: { from_name: form.name, from_email: form.email, message: form.message, to_name: 'Rishabh' },
        }),
      });
      if (res.ok || res.status === 200) { setStatus('success'); setForm({ name: '', email: '', message: '' }); setTimeout(() => setStatus('idle'), 4000); }
      else throw new Error();
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
  };

  const change = (f) => (e) => { setForm(p => ({ ...p, [f]: e.target.value })); if (errors[f]) setErrors(p => ({ ...p, [f]: undefined })); };

  const socials = [
    { icon: <Mail size={18} />, href: 'mailto:rishabhtiwari3538@gmail.com', label: 'Email' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/rishabhtcodes', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: 'https://twitter.com/rishabhtcodes', label: 'Twitter' },
    { icon: <Github size={18} />, href: 'https://github.com/rishabhtcodes', label: 'GitHub' },
  ];

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <span className="section-label">GET IN TOUCH</span>
        <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
          Contact <span className="gradient-text">Me</span>
        </h2>

        <div className="contact__grid">
          <form className={`contact__form glass-card fade-in stagger-1 ${inView ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <div className="contact__field">
              <label>Name</label>
              <input className={errors.name ? 'error' : ''} value={form.name} onChange={change('name')} placeholder="Your name" />
            </div>
            <div className="contact__field">
              <label>Email</label>
              <input className={errors.email ? 'error' : ''} value={form.email} onChange={change('email')} type="email" placeholder="your@email.com" />
            </div>
            <div className="contact__field">
              <label>Message</label>
              <textarea className={errors.message ? 'error' : ''} value={form.message} onChange={change('message')} rows={4} placeholder="How can I help?" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Sent!' : status === 'error' ? 'Failed — Retry' : <><Send size={16} /> Send Message</>}
            </button>
          </form>

          <div className={`contact__info fade-in stagger-2 ${inView ? 'visible' : ''}`}>
            <div className="contact__detail glass-card">
              <Mail size={20} />
              <div>
                <strong>Email</strong>
                <a href="mailto:rishabhtiwari3538@gmail.com">rishabhtiwari3538@gmail.com</a>
              </div>
            </div>
            <div className="contact__detail glass-card">
              <Phone size={20} />
              <div>
                <strong>Phone</strong>
                <span>+91 XXXXXXXXXX</span>
              </div>
            </div>
            <div className="contact__socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="contact__social glass-card" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact__grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; margin-top: 40px; align-items: start; }
        .contact__form { padding: 28px; }
        .contact__field { margin-bottom: 16px; }
        .contact__field label { display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 6px; color: var(--text-secondary); }
        .contact__field input, .contact__field textarea {
          width: 100%; padding: 12px 16px; border: 1px solid var(--border-color);
          border-radius: var(--radius-xs); background: var(--bg-primary);
          color: var(--text-primary); font-family: var(--font-sans); font-size: 0.88rem;
          transition: border-color 0.2s; outline: none;
        }
        .contact__field input:focus, .contact__field textarea:focus { border-color: var(--border-hover); }
        .contact__field input.error, .contact__field textarea.error { border-color: #e74c3c; }
        .contact__field textarea { resize: vertical; min-height: 100px; }
        .contact__detail { padding: 16px 20px; display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .contact__detail strong { display: block; font-size: 0.82rem; }
        .contact__detail a, .contact__detail span { font-size: 0.85rem; color: var(--text-secondary); }
        .contact__socials { display: flex; gap: 10px; margin-top: 8px; }
        .contact__social { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); }
        .contact__social:hover { color: var(--text-primary); }
        @media (max-width: 768px) { .contact__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
