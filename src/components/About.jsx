import { useInView } from 'react-intersection-observer';

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const stats = [
    { label: 'Projects', value: '10+' },
    { label: 'Technologies', value: '15+' },
    { label: 'GitHub Repos', value: '10+' },
    { label: 'Cups of Coffee', value: '∞' },
  ];

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <span className="section-label">ABOUT ME</span>
        <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
          Get to know <span className="gradient-text">who I am</span>
        </h2>

        <div className="about__grid">
          <div className={`about__code glass-card fade-in stagger-1 ${inView ? 'visible' : ''}`}>
            <div className="about__code-header">
              <div className="about__code-dots">
                <span /><span /><span />
              </div>
              <span className="about__code-title">about_me.js</span>
            </div>
            <pre className="about__code-body">
              <code>
                <span className="code-keyword">const</span> <span className="code-variable">aboutMe</span> <span className="code-bracket">= {'{'}</span>
                {'\n'}  <span className="code-property">name</span>: <span className="code-string">"Rishabh Kumar Tiwari"</span>,
                {'\n'}  <span className="code-property">role</span>: <span className="code-string">"Full Stack Developer"</span>,
                {'\n'}  <span className="code-property">university</span>: <span className="code-string">"Lovely Professional University"</span>,
                {'\n'}  <span className="code-property">degree</span>: <span className="code-string">"B.Tech CSE (2023 - 2027)"</span>,
                {'\n'}
                {'\n'}  <span className="code-property">skills</span>: <span className="code-bracket">{'{'}</span>
                {'\n'}    <span className="code-property">frontend</span>: <span className="code-bracket">[</span><span className="code-string">"React"</span>, <span className="code-string">"JavaScript"</span>, <span className="code-string">"Tailwind"</span><span className="code-bracket">]</span>,
                {'\n'}    <span className="code-property">backend</span>: <span className="code-bracket">[</span><span className="code-string">"Django"</span>, <span className="code-string">"Node.js"</span>, <span className="code-string">"REST APIs"</span><span className="code-bracket">]</span>,
                {'\n'}    <span className="code-property">database</span>: <span className="code-bracket">[</span><span className="code-string">"PostgreSQL"</span>, <span className="code-string">"MongoDB"</span>, <span className="code-string">"MySQL"</span><span className="code-bracket">]</span>,
                {'\n'}    <span className="code-property">tools</span>: <span className="code-bracket">[</span><span className="code-string">"Git"</span>, <span className="code-string">"Docker"</span>, <span className="code-string">"CI/CD"</span><span className="code-bracket">]</span>
                {'\n'}  <span className="code-bracket">{'}'}</span>,
                {'\n'}
                {'\n'}  <span className="code-property">passion</span>: <span className="code-string">"Building scalable web apps"</span>,
                {'\n'}  <span className="code-property">currentFocus</span>: <span className="code-string">"Django + React projects"</span>,
                {'\n'}  <span className="code-property">coffee</span>: <span className="code-keyword">true</span> ☕
                {'\n'}<span className="code-bracket">{'}'}</span>;
              </code>
            </pre>
          </div>

          <div className={`about__info fade-in stagger-2 ${inView ? 'visible' : ''}`}>
            <p className="about__text">
              I'm a passionate Full Stack Developer & B.Tech CSE student at Lovely Professional University. I specialize in building production-grade web applications using Django and React.
            </p>
            <p className="about__text">
              My journey in tech started in 2023, and since then I've continuously evolved — shipping e-commerce platforms, mailing systems, REST APIs, and more. I love hackathons, open-source, and mentoring peers.
            </p>
            <div className="about__stats">
              {stats.map((s) => (
                <div key={s.label} className="about__stat glass-card">
                  <span className="about__stat-value">{s.value}</span>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; margin-top: 40px; }
        .about__code { overflow: hidden; }
        .about__code-header {
          display: flex; align-items: center; gap: 12px; padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .about__code-dots { display: flex; gap: 6px; }
        .about__code-dots span { width: 12px; height: 12px; border-radius: 50%; }
        .about__code-dots span:nth-child(1) { background: #ff5f57; }
        .about__code-dots span:nth-child(2) { background: #febc2e; }
        .about__code-dots span:nth-child(3) { background: #28c840; }
        .about__code-title { font-family: var(--font-mono); font-size: 0.78rem; color: #6b7280; }
        .about__code { background: #1e1e2e !important; border: 1px solid #313244; }
        .about__code-header { background: #181825; border-bottom: 1px solid #313244; }
        .about__code-body { padding: 20px; font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.9; color: #cdd6f4; overflow-x: auto; white-space: pre; background: #1e1e2e; }
        .code-keyword   { color: #cba6f7; font-style: italic; }
        .code-variable  { color: #89dceb; }
        .code-property  { color: #89b4fa; }
        .code-string    { color: #a6e3a1; }
        .code-number    { color: #fab387; }
        .code-comment   { color: #6c7086; font-style: italic; }
        .code-bracket   { color: #cdd6f4; }
        .about__text { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px; }
        .about__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
        .about__stat { padding: 16px; text-align: center; }
        .about__stat:hover { transform: translateY(-2px); }
        .about__stat-value { display: block; font-size: 1.5rem; font-weight: 800; background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .about__stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
        @media (max-width: 768px) {
          .about__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
