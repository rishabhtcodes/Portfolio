import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'Lovely Kart E-Commerce',
        emoji: '🛒',
        description:
            'A full-featured e-commerce platform with user authentication, product management, cart system, order tracking, and Razorpay payment integration.',
        tech: ['Django', 'React', 'Tailwind CSS', 'MySQL', 'Vercel'],
        github: 'https://github.com/rishabhtcodes',
        live: 'https://lovelycart.vercel.app/',
        gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    },
    {
        title: 'Crop Disease Prediction',
        emoji: '🌾',
        description:
            'ML-powered web application that predicts crop diseases from leaf images using deep learning models, helping farmers take preventive action.',
        tech: ['Python', 'TensorFlow', 'Django', 'REST API'],
        github: 'https://github.com/rishabhtcodes',
        live: null,
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    },
    {
        title: 'Study Timetable Generator',
        emoji: '📅',
        description:
            'Automated study schedule generator that creates optimized timetables based on subjects, priorities, and available time slots.',
        tech: ['Python', 'Django', 'JavaScript', 'HTML/CSS'],
        github: 'https://github.com/rishabhtcodes',
        live: null,
        gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    },
    {
        title: 'Udyog Saarthi',
        emoji: '💼',
        description:
            'A collaborative job portal platform connecting job seekers with employers, featuring profile management and job listings.',
        tech: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
        github: 'https://github.com/rishabhtcodes/Udyog_Saarthi',
        live: null,
        gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    },
    {
        title: 'Django REST APIs',
        emoji: '🔗',
        description:
            'Collection of RESTful API implementations showcasing different patterns for data serialization, authentication, and endpoint design.',
        tech: ['Django', 'DRF', 'Python', 'REST'],
        github: 'https://github.com/rishabhtcodes/Django_Rest_Api-s',
        live: null,
        gradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    },
    {
        title: 'Django CI/CD Pipeline',
        emoji: '🔄',
        description:
            'Automated CI/CD pipeline setup for Django projects with GitHub Actions, testing, linting, and deployment automation.',
        tech: ['Django', 'GitHub Actions', 'Docker', 'CI/CD'],
        github: 'https://github.com/rishabhtcodes/djangocicd',
        live: null,
        gradient: 'linear-gradient(135deg, #f59e0b, #10b981)',
    },
];

export default function Projects() {
    const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

    return (
        <section className="section" id="projects" ref={ref}>
            <div className="container">
                <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ textAlign: 'center' }}>
                    <span className="section-label" style={{ justifyContent: 'center' }}>Projects</span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        A selection of projects I've built and contributed to
                    </p>
                </div>

                <div className="projects__grid">
                    {projects.map((project, idx) => (
                        <div
                            key={project.title}
                            className={`projects__card glass-card fade-in stagger-${Math.min(idx + 1, 6)} ${inView ? 'visible' : ''}`}
                        >
                            <div
                                className="projects__card-accent"
                                style={{ background: project.gradient }}
                            />

                            <div className="projects__card-content">
                                <div className="projects__card-header">
                                    <span className="projects__card-emoji">{project.emoji}</span>
                                    <h3 className="projects__card-title">{project.title}</h3>
                                </div>

                                <p className="projects__card-desc">{project.description}</p>

                                <div className="projects__card-tech">
                                    {project.tech.map((t) => (
                                        <span key={t} className="projects__tag">{t}</span>
                                    ))}
                                </div>

                                <div className="projects__card-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link">
                                            <Github size={16} />
                                            <span>Code</span>
                                        </a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="projects__link projects__link--live">
                                            <ExternalLink size={16} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .projects__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 56px;
        }

        .projects__card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .projects__card-accent {
          height: 4px;
          width: 100%;
        }

        .projects__card-content {
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .projects__card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .projects__card-emoji {
          font-size: 1.6rem;
        }

        .projects__card-title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .projects__card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          flex: 1;
        }

        .projects__card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .projects__tag {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
          background: rgba(139, 92, 246, 0.1);
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.15);
        }

        .projects__card-links {
          display: flex;
          gap: 12px;
        }

        .projects__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          border: 1px solid var(--bg-glass-border);
          transition: all 0.3s ease;
        }

        .projects__link:hover {
          color: var(--text-primary);
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.06);
        }

        .projects__link--live {
          color: var(--accent-green);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .projects__link--live:hover {
          border-color: var(--accent-green);
          background: rgba(16, 185, 129, 0.06);
          color: var(--accent-green);
        }

        @media (max-width: 1024px) {
          .projects__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .projects__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
}
