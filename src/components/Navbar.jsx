import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo">
          <span className="gradient-text">RKT</span>
          <span className="navbar__dot">.</span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/Rishabh_Kumar_Tiwari_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary navbar__cta"
        >
          Resume
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .navbar--scrolled {
          padding: 10px 0;
          background: rgba(6, 6, 11, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--bg-glass-border);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          display: flex;
          align-items: center;
        }

        .navbar__dot {
          color: var(--accent-cyan);
          font-size: 2rem;
          line-height: 1;
        }

        .navbar__links {
          display: flex;
          gap: 8px;
        }

        .navbar__link {
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          position: relative;
        }

        .navbar__link:hover {
          color: var(--text-primary);
          background: rgba(139, 92, 246, 0.08);
        }

        .navbar__cta {
          padding: 8px 20px;
          font-size: 0.85rem;
        }

        .navbar__toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 768px) {
          .navbar__links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(6, 6, 11, 0.97);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 999;
          }

          .navbar__links--open {
            opacity: 1;
            pointer-events: all;
          }

          .navbar__link {
            font-size: 1.3rem;
            padding: 14px 28px;
          }

          .navbar__cta {
            display: none;
          }

          .navbar__toggle {
            display: block;
            z-index: 1001;
          }
        }
      `}</style>
    </nav>
  );
}
