import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

const experiences = [
    {
        type: 'work', icon: <Briefcase size={20} />,
        title: 'Full Stack Developer', org: 'Professional', location: 'India',
        period: '2023 — Present',
        desc: 'Working as a Full Stack Developer building scalable web applications using Django & React. Developing e-commerce platforms, REST APIs, CI/CD pipelines, and mailing systems.',
        skills: ['Django', 'React', 'REST APIs', 'MySQL', 'Node.js'],
        color: '#333',
    },
    {
        type: 'education', icon: <GraduationCap size={20} />,
        title: 'B.Tech CSE', org: 'Lovely Professional University', location: 'Jalandhar, Punjab',
        period: '2023 — 2027',
        orgLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Lovely_Professional_University_logo.png/220px-Lovely_Professional_University_logo.png',
        desc: 'Currently pursuing B.Tech in Computer Science & Engineering. Active in hackathons, open-source contributions, and technical clubs.',
        skills: ['DSA', 'Algorithms', 'DBMS', 'OS'],
        color: '#666',
    },
    {
        type: 'education', icon: <GraduationCap size={20} />,
        title: 'Senior Secondary (XII)', org: 'CBSE Board', location: 'India',
        period: '2021 — 2023',
        orgLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/CBSE_new_logo.svg/1200px-CBSE_new_logo.svg.png',
        desc: 'Completed senior secondary education with Science stream (PCM + CS).',
        skills: ['Physics', 'Maths', 'CS'],
        color: '#999',
    },
];

export default function Experience() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="section" id="experience" ref={ref}>
            <div className="container">
                <span className="section-label">JOURNEY</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    Experience & <span className="gradient-text">Education</span>
                </h2>

                <div className="timeline">
                    {experiences.map((exp, idx) => (
                        <div
                            key={idx}
                            className={`timeline__item fade-in stagger-${Math.min(idx + 1, 6)} ${inView ? 'visible' : ''} ${idx % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                        >
                            <div className="timeline__dot" style={{ background: exp.color }}>{exp.icon}</div>
                            <div className="timeline__card glass-card">
                                <div className="timeline__meta">
                                    <span className="timeline__type">{exp.type === 'work' ? '💼 Work' : '🎓 Education'}</span>
                                    <span className="timeline__period"><Calendar size={12} /> {exp.period}</span>
                                </div>
                                <h3 className="timeline__title">{exp.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    {exp.orgLogo && <img src={exp.orgLogo} alt={exp.org} style={{ width: '20px', height: '20px', objectFit: 'contain', backgroundColor: 'white', borderRadius: '4px', padding: '2px' }} />}
                                    <p className="timeline__org" style={{ marginBottom: 0 }}><MapPin size={12} /> {exp.org} · {exp.location}</p>
                                </div>
                                <p className="timeline__desc">{exp.desc}</p>
                                <div className="timeline__skills">
                                    {exp.skills.map((s) => <span key={s} className="timeline__skill">{s}</span>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .timeline { position: relative; margin-top: 48px; padding-left: 40px; }
        .timeline::before { content: ''; position: absolute; left: 18px; top: 0; bottom: 0; width: 2px; background: var(--border-color); }
        .timeline__item { position: relative; margin-bottom: 32px; }
        .timeline__dot {
          position: absolute; left: -40px; top: 24px; width: 36px; height: 36px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: white; z-index: 2; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .timeline__card { padding: 24px; margin-left: 12px; }
        .timeline__meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .timeline__type { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); }
        .timeline__period { display: flex; align-items: center; gap: 4px; font-size: 0.78rem; color: var(--text-muted); }
        .timeline__title { font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
        .timeline__org { font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
        .timeline__desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px; }
        .timeline__skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .timeline__skill { padding: 4px 12px; font-size: 0.72rem; font-weight: 500; border-radius: var(--radius-xs); background: var(--accent-soft); color: var(--text-secondary); border: 1px solid var(--border-color); }
      `}</style>
        </section>
    );
}
