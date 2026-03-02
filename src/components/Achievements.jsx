import { useInView } from 'react-intersection-observer';
import { Trophy, Award, HandHeart } from 'lucide-react';

const achievements = [
    {
        icon: <Trophy size={28} />,
        emoji: '🥇',
        title: 'Top 10 — Hack-Verse',
        subtitle: 'Intra-University Hackathon',
        date: 'March 2024',
        description:
            'Secured a Top 10 position among 100+ teams, building an innovative solution under time-constrained conditions.',
        color: '#f59e0b',
    },
    {
        icon: <Award size={28} />,
        emoji: '🥈',
        title: 'Rank 4 — Concoction',
        subtitle: 'Tech Fusion Hackathon',
        date: 'March 2024',
        description:
            'Achieved 4th place in a competitive tech fusion hackathon, demonstrating strong problem-solving and teamwork.',
        color: '#8b5cf6',
    },
    {
        icon: <HandHeart size={28} />,
        emoji: '🤝',
        title: 'Chhalaang NGO Contribution',
        subtitle: 'Education for Rural Children',
        date: 'June 2024',
        description:
            'Contributed to enhancing education access for rural children through the Chhalaang NGO initiative.',
        color: '#10b981',
    },
];

export default function Achievements() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <section className="section" id="achievements" ref={ref}>
            <div className="container">
                <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Achievements</span>
                    <h2 className="section-title">
                        Milestones &amp; <span className="gradient-text">Recognition</span>
                    </h2>
                </div>

                <div className="achievements__grid">
                    {achievements.map((item, idx) => (
                        <div
                            key={item.title}
                            className={`achievements__card glass-card fade-in stagger-${idx + 1} ${inView ? 'visible' : ''}`}
                        >
                            <div
                                className="achievements__card-icon"
                                style={{
                                    background: `${item.color}15`,
                                    color: item.color,
                                    border: `1px solid ${item.color}30`,
                                }}
                            >
                                {item.icon}
                            </div>

                            <div className="achievements__card-content">
                                <span className="achievements__card-date">{item.date}</span>
                                <h3 className="achievements__card-title">{item.title}</h3>
                                <span className="achievements__card-subtitle">{item.subtitle}</span>
                                <p className="achievements__card-desc">{item.description}</p>
                            </div>

                            <div
                                className="achievements__card-glow"
                                style={{ background: item.color }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .achievements__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 56px;
        }

        .achievements__card {
          padding: 32px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .achievements__card-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .achievements__card-date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .achievements__card-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 8px 0 4px;
        }

        .achievements__card-subtitle {
          font-size: 0.88rem;
          color: var(--accent-cyan);
          font-weight: 500;
          display: block;
          margin-bottom: 12px;
        }

        .achievements__card-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .achievements__card-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 80px;
          border-radius: 50%;
          opacity: 0.06;
          filter: blur(40px);
          transition: opacity 0.4s ease;
        }

        .achievements__card:hover .achievements__card-glow {
          opacity: 0.12;
        }

        @media (max-width: 1024px) {
          .achievements__grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
        </section>
    );
}
