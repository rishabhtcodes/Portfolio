import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-bold">Rishabh</span>
          <span className="navbar__logo-light">Tiwari</span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="navbar__link" onClick={(e) => nav(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="navbar__toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 16px 0;
          background: transparent;
          transition: all 0.3s ease;
        }
        .navbar--scrolled {
          padding: 10px 0;
          background: var(--bg-card);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--border-color);
        }
        .navbar__inner { display: flex; align-items: center; justify-content: space-between; }
        .navbar__logo { font-size: 1.3rem; }
        .navbar__logo-bold { font-weight: 800; }
        .navbar__logo-light { font-weight: 300; }
        .navbar__links { display: flex; gap: 4px; }
        .navbar__link {
          padding: 8px 14px; font-size: 0.85rem; font-weight: 500;
          color: var(--text-secondary); border-radius: var(--radius-xs);
          transition: all 0.2s ease;
        }
        .navbar__link:hover { color: var(--text-primary); background: var(--accent-soft); }
        .navbar__actions { display: flex; gap: 8px; align-items: center; }
        .navbar__btn {
          width: 38px; height: 38px; border-radius: var(--radius-xs);
          border: 1px solid var(--border-color); background: var(--bg-card);
          color: var(--text-primary); display: flex; align-items: center;
          justify-content: center; cursor: pointer; transition: all 0.2s;
        }
        .navbar__btn:hover { border-color: var(--border-hover); }
        .navbar__toggle { display: none; background: none; border: none; color: var(--text-primary); cursor: pointer; }
        @media (max-width: 768px) {
          .navbar__links {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: var(--bg-primary); flex-direction: column;
            align-items: center; justify-content: center; gap: 8px;
            opacity: 0; pointer-events: none; transition: opacity 0.3s; z-index: 999;
          }
          .navbar__links--open { opacity: 1; pointer-events: all; }
          .navbar__link { font-size: 1.3rem; padding: 14px 28px; }
          .navbar__toggle { display: block; z-index: 1001; }
        }
      `}</style>
    </nav>
  );
}
