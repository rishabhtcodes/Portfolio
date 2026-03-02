import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const roles = [
    'Full Stack Engineer',
    'Django Developer',
    'React Builder',
    'REST API Architect',
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && displayText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(
                    isDeleting
                        ? currentRole.substring(0, displayText.length - 1)
                        : currentRole.substring(0, displayText.length + 1)
                );
            }, isDeleting ? 40 : 80);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <section className="hero" id="hero">
            {/* Background orbs */}
            <div className="hero__orb hero__orb--purple" />
            <div className="hero__orb hero__orb--cyan" />
            <div className="hero__orb hero__orb--pink" />

            <div className="hero__content container">
                <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Available for opportunities
                </div>

                <h1 className="hero__title">
                    Hi, I'm{' '}
                    <span className="gradient-text">Rishabh</span>
                </h1>

                <div className="hero__role">
                    <span className="hero__role-text">{displayText}</span>
                    <span className="hero__cursor">|</span>
                </div>

                <p className="hero__desc">
                    I build scalable, user-centric web applications using Django &amp; React.
                    <br />
                    Passionate about clean code, REST APIs, and cloud technologies.
                </p>

                <div className="hero__actions">
                    <a href="#projects" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        View My Work
                    </a>
                    <a href="#contact" className="btn btn-outline" onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Get in Touch
                    </a>
                </div>

                <div className="hero__socials">
                    <a href="https://github.com/rishabhtcodes" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com/in/rishabhtcodes" target="_blank" rel="noopener noreferrer" className="hero__social" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:rishabhtiwari3538@gmail.com" className="hero__social" aria-label="Email">
                        <Mail size={20} />
                    </a>
                </div>
            </div>

            <a href="#about" className="hero__scroll" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}>
                <ChevronDown size={24} />
            </a>

            <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }

        .hero__orb--purple {
          width: 500px;
          height: 500px;
          background: var(--accent-purple);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        .hero__orb--cyan {
          width: 400px;
          height: 400px;
          background: var(--accent-cyan);
          bottom: -50px;
          left: -100px;
          animation-delay: 2s;
        }

        .hero__orb--pink {
          width: 300px;
          height: 300px;
          background: var(--accent-pink);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
          opacity: 0.15;
        }

        .hero__content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 50px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: var(--accent-green);
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 32px;
          animation: float 4s ease-in-out infinite;
        }

        .hero__badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .hero__title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .hero__role {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-family: var(--font-mono);
          color: var(--text-secondary);
          margin-bottom: 28px;
          min-height: 2.2em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .hero__cursor {
          animation: pulse-glow 1s step-end infinite;
          color: var(--accent-purple);
          font-weight: 300;
        }

        .hero__desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.8;
        }

        .hero__actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .hero__socials {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .hero__social {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--bg-glass-border);
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .hero__social:hover {
          color: var(--accent-purple);
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
        }

        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-muted);
          animation: float 3s ease-in-out infinite;
          transition: color 0.3s ease;
        }

        .hero__scroll:hover {
          color: var(--accent-purple);
        }

        @media (max-width: 480px) {
          .hero__desc br {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}
