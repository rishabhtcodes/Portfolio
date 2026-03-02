import { useInView } from 'react-intersection-observer';

const skillCategories = [
    {
        title: 'Languages',
        icon: '💻',
        color: '#8b5cf6',
        skills: [
            { name: 'Python', icon: '🐍' },
            { name: 'JavaScript', icon: '⚡' },
            { name: 'Java', icon: '☕' },
            { name: 'C++', icon: '🔷' },
            { name: 'C', icon: '🔵' },
            { name: 'PHP', icon: '🐘' },
        ],
    },
    {
        title: 'Frameworks',
        icon: '🚀',
        color: '#06b6d4',
        skills: [
            { name: 'Django', icon: '🌿' },
            { name: 'React', icon: '⚛️' },
            { name: 'Node.js', icon: '🟢' },
            { name: 'Vite', icon: '⚡' },
            { name: 'Tailwind CSS', icon: '🎨' },
            { name: 'REST APIs', icon: '🔗' },
        ],
    },
    {
        title: 'Databases',
        icon: '🗄️',
        color: '#10b981',
        skills: [
            { name: 'MySQL', icon: '🐬' },
            { name: 'MongoDB', icon: '🍃' },
            { name: 'SQLite', icon: '📁' },
        ],
    },
    {
        title: 'Tools & DevOps',
        icon: '🛠️',
        color: '#f59e0b',
        skills: [
            { name: 'Git', icon: '📌' },
            { name: 'GitHub', icon: '🐙' },
            { name: 'VS Code', icon: '💎' },
            { name: 'CI/CD', icon: '🔄' },
            { name: 'Vercel', icon: '▲' },
            { name: 'Linux', icon: '🐧' },
        ],
    },
];

export default function Skills() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="section" id="skills" ref={ref}>
            <div className="container">
                <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Skills</span>
                    <h2 className="section-title">
                        My <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <div className="skills__grid">
                    {skillCategories.map((category, catIdx) => (
                        <div
                            key={category.title}
                            className={`skills__category glass-card fade-in stagger-${catIdx + 1} ${inView ? 'visible' : ''}`}
                        >
                            <div className="skills__category-header">
                                <span className="skills__category-icon">{category.icon}</span>
                                <h3 className="skills__category-title">{category.title}</h3>
                                <div
                                    className="skills__category-line"
                                    style={{ background: category.color }}
                                />
                            </div>

                            <div className="skills__list">
                                {category.skills.map((skill) => (
                                    <div key={skill.name} className="skills__item">
                                        <span className="skills__item-icon">{skill.icon}</span>
                                        <span className="skills__item-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .skills__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 56px;
        }

        .skills__category {
          padding: 32px;
        }

        .skills__category-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .skills__category-icon {
          font-size: 1.4rem;
        }

        .skills__category-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .skills__category-line {
          flex: 1;
          height: 2px;
          border-radius: 1px;
          opacity: 0.3;
          min-width: 40px;
        }

        .skills__list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .skills__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .skills__item:hover {
          background: rgba(139, 92, 246, 0.06);
          border-color: rgba(139, 92, 246, 0.15);
          transform: translateX(4px);
        }

        .skills__item-icon {
          font-size: 1.1rem;
        }

        .skills__item-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .skills__item:hover .skills__item-name {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .skills__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .skills__list {
            grid-template-columns: 1fr;
          }

          .skills__category {
            padding: 24px;
          }
        }
      `}</style>
        </section>
    );
}
