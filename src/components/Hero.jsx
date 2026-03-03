import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Twitter, ArrowDown } from 'lucide-react';

const roles = ['Full Stack Developer', 'Django Developer', 'React Builder', 'REST API Architect'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    let t;
    if (!deleting && text === role) t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && text === '') { setDeleting(false); setRoleIndex((i) => (i + 1) % roles.length); }
    else t = setTimeout(() => setText(deleting ? role.slice(0, text.length - 1) : role.slice(0, text.length + 1)), deleting ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-grid" />
      <div className="hero__content container">
        <div className="hero__text">
          <span className="hero__greeting">Hey there 👋, I'm</span>
          <h1 className="hero__name">
            Rishabh<br />
            <span className="gradient-text">Kumar Tiwari</span>
          </h1>
          <div className="hero__role">
            <span className="hero__role-text">{text}</span>
            <span className="hero__cursor">|</span>
          </div>
          <p className="hero__desc">
            A passionate Full Stack Developer & CSE student at LPU, building scalable web applications with Django, React, and modern technologies.
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get In Touch
            </a>
          </div>
          <div className="hero__socials">
            {[
              { icon: <Mail size={18} />, href: 'mailto:rishabhtiwari3538@gmail.com', label: 'Email' },
              { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/rishabhtcodes', label: 'LinkedIn' },
              { icon: <Github size={18} />, href: 'https://github.com/rishabhtcodes', label: 'GitHub' },
              { icon: <Twitter size={18} />, href: 'https://twitter.com/rishabhtcodes', label: 'Twitter' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hero__social" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__code-window glass-card">
            <div className="hero__code-dots">
              <span style={{ background: '#999' }} /><span style={{ background: '#bbb' }} /><span style={{ background: '#ddd' }} />
            </div>
            <pre className="hero__code"><code>
              {`const rishabh = {
  role: "Full Stack Developer",
  university: "LPU",
  skills: ["Django", "React",
    "REST APIs", "Node.js"],
  passion: "Building products",
  coffee: true ☕
};`}
            </code></pre>
          </div>
        </div>
      </div>
      <a href="#about" className="hero__scroll" onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}>
        <ArrowDown size={18} />
      </a>

      <style>{`
        .hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; padding-top: 80px; }
        .hero__bg-grid {
          position: absolute; inset: 0; opacity: 0.03;
          background-image:
            linear-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero__content { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
        .hero__greeting { font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px; display: block; }
        .hero__name { font-size: clamp(2.5rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 16px; }
        .gradient-text { background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero__role { display: flex; align-items: center; gap: 2px; margin-bottom: 20px; font-size: 1.2rem; font-weight: 600; min-height: 32px; }
        .hero__role-text { color: var(--text-secondary); }
        .hero__cursor { animation: pulse-glow 1s step-end infinite; color: var(--accent); }
        .hero__desc { font-size: 0.95rem; color: var(--text-secondary); max-width: 460px; line-height: 1.7; margin-bottom: 28px; }
        .hero__cta { display: flex; gap: 12px; margin-bottom: 32px; }
        .hero__socials { display: flex; gap: 10px; }
        .hero__social {
          width: 40px; height: 40px; border-radius: var(--radius-xs);
          display: flex; align-items: center; justify-content: center;
          background: var(--bg-card); border: 1px solid var(--border-color);
          color: var(--text-secondary); transition: all 0.2s;
        }
        .hero__social:hover { color: var(--text-primary); border-color: var(--border-hover); transform: translateY(-2px); }
        .hero__visual { display: flex; justify-content: center; }
        .hero__code-window { padding: 24px; max-width: 400px; width: 100%; animation: float 6s ease infinite; }
        .hero__code-dots { display: flex; gap: 6px; margin-bottom: 16px; }
        .hero__code-dots span { width: 10px; height: 10px; border-radius: 50%; }
        .hero__code { font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.8; color: var(--text-secondary); white-space: pre; overflow-x: auto; }
        .hero__scroll {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted); animation: float 3s ease infinite;
        }
        @media (max-width: 768px) {
          .hero__content { grid-template-columns: 1fr; text-align: center; }
          .hero__desc { margin: 0 auto 28px; }
          .hero__cta, .hero__socials { justify-content: center; }
          .hero__visual { order: -1; }
          .hero__code-window { max-width: 320px; }
        }
      `}</style>
    </section>
  );
}
