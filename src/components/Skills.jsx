import { useInView } from 'react-intersection-observer';

const categories = [
  {
    title: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Django', 'Node.js', 'Python', 'REST APIs'],
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript', 'Java', 'C'],
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    title: 'Other',
    skills: ['REST', 'JWT Auth', 'Vite', 'Figma'],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="container">
        <span className="section-label">TECH STACK</span>
        <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
          Skills & <span className="gradient-text">Technologies</span>
        </h2>
        <p className={`section-subtitle fade-in stagger-1 ${inView ? 'visible' : ''}`}>
          Technologies I work with to build modern, scalable web applications.
        </p>

        <div className="skills__grid">
          {categories.map((cat, idx) => (
            <div
              key={cat.title}
              className={`skills__card glass-card fade-in stagger-${Math.min(idx + 1, 6)} ${inView ? 'visible' : ''}`}
            >
              <h3 className="skills__card-title">{cat.title}</h3>
              <div className="skills__tags">
                {cat.skills.map((s) => (
                  <span key={s} className="skills__tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
        .skills__card { padding: 24px; }
        .skills__card-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 14px; }
        .skills__tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skills__tag {
          padding: 6px 14px; font-size: 0.78rem; font-weight: 500;
          border-radius: var(--radius-xs);
          background: var(--accent-soft); color: var(--text-secondary);
          border: 1px solid var(--border-color); transition: all 0.2s;
        }
        .skills__tag:hover { border-color: var(--border-hover); color: var(--text-primary); }
        @media (max-width: 768px) { .skills__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .skills__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
