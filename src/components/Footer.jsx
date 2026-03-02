import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__brand">
                        <span className="footer__logo">
                            <span className="gradient-text">RKT</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>.</span>
                        </span>
                        <p className="footer__tagline">
                            Building the web, one line at a time.
                        </p>
                    </div>

                    <div className="footer__socials">
                        <a href="https://github.com/rishabhtcodes" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href="https://linkedin.com/in/rishabhtcodes" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href="mailto:rishabhtiwari3538@gmail.com" className="footer__social" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </div>

                    <div className="footer__bottom">
                        <p>
                            © {new Date().getFullYear()} Rishabh Kumar Tiwari. Made with{' '}
                            <Heart size={14} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--accent-pink)', fill: 'var(--accent-pink)' }} />{' '}
                            using React + Vite
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        .footer {
          padding: 48px 0 32px;
          border-top: 1px solid var(--bg-glass-border);
          background: var(--bg-secondary);
        }

        .footer__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }

        .footer__logo {
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .footer__tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .footer__socials {
          display: flex;
          gap: 12px;
        }

        .footer__social {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--bg-glass-border);
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .footer__social:hover {
          color: var(--accent-purple);
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.1);
          transform: translateY(-2px);
        }

        .footer__bottom p {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
        </footer>
    );
}
