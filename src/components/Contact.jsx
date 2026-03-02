import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const links = [
    {
        icon: <Mail size={24} />,
        label: 'Email',
        value: 'rishabhtiwari3538@gmail.com',
        href: 'mailto:rishabhtiwari3538@gmail.com',
        color: '#ec4899',
    },
    {
        icon: <Github size={24} />,
        label: 'GitHub',
        value: 'rishabhtcodes',
        href: 'https://github.com/rishabhtcodes',
        color: '#8b5cf6',
    },
    {
        icon: <Linkedin size={24} />,
        label: 'LinkedIn',
        value: 'in/rishabhtcodes',
        href: 'https://linkedin.com/in/rishabhtcodes',
        color: '#06b6d4',
    },
];

export default function Contact() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <section className="section" id="contact" ref={ref}>
            <div className="container">
                <div className="contact__wrapper">
                    {/* Decorative gradient */}
                    <div className="contact__bg-gradient" />

                    <div className={`contact__content fade-in ${inView ? 'visible' : ''}`}>
                        <span className="section-label" style={{ justifyContent: 'center' }}>Contact</span>
                        <h2 className="section-title" style={{ textAlign: 'center' }}>
                            Let's build something{' '}
                            <span className="gradient-text">awesome together</span>
                        </h2>
                        <p className="section-subtitle" style={{ margin: '0 auto 48px', textAlign: 'center' }}>
                            I'm open to freelance opportunities, collaborations, and interesting conversations. Drop me a line!
                        </p>

                        <div className="contact__links">
                            {links.map((link, idx) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className={`contact__link glass-card fade-in stagger-${idx + 1} ${inView ? 'visible' : ''}`}
                                >
                                    <div
                                        className="contact__link-icon"
                                        style={{
                                            background: `${link.color}15`,
                                            color: link.color,
                                            border: `1px solid ${link.color}25`,
                                        }}
                                    >
                                        {link.icon}
                                    </div>
                                    <div className="contact__link-info">
                                        <span className="contact__link-label">{link.label}</span>
                                        <span className="contact__link-value">{link.value}</span>
                                    </div>
                                    <ArrowUpRight size={18} className="contact__link-arrow" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .contact__wrapper {
          position: relative;
          padding: 80px 0;
        }

        .contact__bg-gradient {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.08), transparent 70%);
          pointer-events: none;
        }

        .contact__content {
          position: relative;
          z-index: 2;
        }

        .contact__links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .contact__link {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          position: relative;
          cursor: pointer;
        }

        .contact__link-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact__link-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact__link-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .contact__link-value {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .contact__link-arrow {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--text-muted);
          opacity: 0;
          transition: all 0.3s ease;
          transform: translate(-4px, 4px);
        }

        .contact__link:hover .contact__link-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        @media (max-width: 768px) {
          .contact__links {
            grid-template-columns: 1fr;
            max-width: 400px;
          }

          .contact__link {
            flex-direction: row;
            text-align: left;
          }

          .contact__link-info {
            flex: 1;
          }
        }
      `}</style>
        </section>
    );
}
