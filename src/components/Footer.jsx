import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const socials = [
    { icon: <Mail size={16} />, href: 'mailto:rishabhtiwari3538@gmail.com' },
    { icon: <Linkedin size={16} />, href: 'https://linkedin.com/in/rishabhtcodes' },
    { icon: <Twitter size={16} />, href: 'https://twitter.com/rishabhtcodes' },
    { icon: <Github size={16} />, href: 'https://github.com/rishabhtcodes' },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__left">
          <span className="footer__name"><strong>Rishabh</strong> Tiwari</span>
          <span className="footer__role">Full Stack Developer</span>
        </div>
        <p className="footer__copy">
          Made with <Heart size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> © 2026
        </p>
        <div className="footer__socials">
          {socials.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social">{s.icon}</a>
          ))}
        </div>
      </div>
      <style>{`
        .footer { padding: 32px 0; border-top: 1px solid var(--border-color); }
        .footer__inner { display: flex; align-items: center; justify-content: space-between; }
        .footer__left { display: flex; flex-direction: column; }
        .footer__name { font-size: 1.1rem; }
        .footer__role { font-size: 0.75rem; color: var(--text-muted); }
        .footer__copy { font-size: 0.8rem; color: var(--text-muted); }
        .footer__socials { display: flex; gap: 8px; }
        .footer__social {
          width: 34px; height: 34px; border-radius: var(--radius-xs);
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-card); border: 1px solid var(--border-color);
          color: var(--text-secondary); transition: all 0.2s;
        }
        .footer__social:hover { color: var(--text-primary); border-color: var(--border-hover); }
        @media (max-width: 600px) { .footer__inner { flex-direction: column; gap: 16px; text-align: center; } }
      `}</style>
    </footer>
  );
}
