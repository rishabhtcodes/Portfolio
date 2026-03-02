import { useInView } from 'react-intersection-observer';
import { MapPin, GraduationCap, Briefcase, Heart } from 'lucide-react';

const codeBlock = `class RishabhKumarTiwari:
    def __init__(self):
        self.name = "Rishabh Kumar Tiwari"
        self.role = "Full Stack Engineer"
        self.education = "B.Tech CSE @ LPU"
        self.stack = ["Django", "React", "Node.js"]
        self.interests = [
            "Full Stack Dev",
            "REST APIs",
            "Cloud Technologies"
        ]

    def say_hi(self):
        print("Let's build something awesome 🚀")

me = RishabhKumarTiwari()
me.say_hi()`;

export default function About() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <section className="section" id="about" ref={ref}>
            <div className="container">
                <div className={`fade-in ${inView ? 'visible' : ''}`}>
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">
                        Passionate about building things <br />
                        that live on the <span className="gradient-text">internet</span>
                    </h2>
                </div>

                <div className="about__grid">
                    {/* Code Block */}
                    <div className={`about__code glass-card fade-in-left ${inView ? 'visible' : ''}`}>
                        <div className="about__code-header">
                            <span className="about__code-dot about__code-dot--red" />
                            <span className="about__code-dot about__code-dot--yellow" />
                            <span className="about__code-dot about__code-dot--green" />
                            <span className="about__code-filename">about_me.py</span>
                        </div>
                        <pre className="about__code-content">
                            <code>{codeBlock}</code>
                        </pre>
                    </div>

                    {/* Info cards */}
                    <div className="about__info">
                        <p className={`about__bio fade-in-right ${inView ? 'visible' : ''}`}>
                            I'm a Full Stack Engineer from Jalandhar, Punjab, currently pursuing my B.Tech in Computer Science &amp; Engineering at Lovely Professional University. I love turning ideas into scalable, clean web applications.
                        </p>

                        <div className="about__cards">
                            <div className={`about__card glass-card fade-in stagger-1 ${inView ? 'visible' : ''}`}>
                                <GraduationCap size={22} className="about__card-icon" />
                                <div>
                                    <h4>Education</h4>
                                    <p>B.Tech CSE @ LPU — CGPA 7.10</p>
                                </div>
                            </div>

                            <div className={`about__card glass-card fade-in stagger-2 ${inView ? 'visible' : ''}`}>
                                <MapPin size={22} className="about__card-icon" />
                                <div>
                                    <h4>Location</h4>
                                    <p>Jalandhar, Punjab, India 🇮🇳</p>
                                </div>
                            </div>

                            <div className={`about__card glass-card fade-in stagger-3 ${inView ? 'visible' : ''}`}>
                                <Briefcase size={22} className="about__card-icon" />
                                <div>
                                    <h4>Focus</h4>
                                    <p>Django + React Full Stack Development</p>
                                </div>
                            </div>

                            <div className={`about__card glass-card fade-in stagger-4 ${inView ? 'visible' : ''}`}>
                                <Heart size={22} className="about__card-icon" />
                                <div>
                                    <h4>Interests</h4>
                                    <p>REST APIs, Cloud, CI/CD Pipelines</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .about__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-top: 48px;
          align-items: start;
        }

        .about__code {
          padding: 0;
          overflow: hidden;
          position: sticky;
          top: 100px;
        }

        .about__code:hover {
          transform: none;
        }

        .about__code-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--bg-glass-border);
          background: rgba(0, 0, 0, 0.2);
        }

        .about__code-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .about__code-dot--red { background: #ef4444; }
        .about__code-dot--yellow { background: #f59e0b; }
        .about__code-dot--green { background: #10b981; }

        .about__code-filename {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-left: 8px;
        }

        .about__code-content {
          padding: 24px;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          line-height: 1.8;
          color: var(--accent-cyan);
          overflow-x: auto;
        }

        .about__code-content code {
          white-space: pre;
        }

        .about__bio {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .about__cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .about__card {
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .about__card:hover {
          transform: translateY(-2px);
        }

        .about__card-icon {
          color: var(--accent-purple);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .about__card h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .about__card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .about__grid {
            grid-template-columns: 1fr;
          }

          .about__code {
            position: static;
          }
        }

        @media (max-width: 480px) {
          .about__cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
}
