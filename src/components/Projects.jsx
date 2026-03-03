import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'R.onny Store', category: 'E-COMMERCE', number: '01',
    description: 'A full-featured e-commerce platform built with Django, PostgreSQL, and a modern minimal UI. Includes user auth, cart, orders, REST API with JWT, and email notifications.',
    tech: ['Django', 'PostgreSQL', 'DRF', 'Tailwind CSS'],
    github: 'https://github.com/rishabhtcodes/E-Commerce',
    live: 'https://e-commerce-ebon-eta-82.vercel.app/',
  },
  {
    title: 'Mailing Web App', category: 'WEB APPLICATION', number: '02',
    description: 'A web app for composing and sending emails via SMTP with user authentication, email history tracking, and a responsive Tailwind CSS UI. Uses MongoDB via djongo.',
    tech: ['Django', 'MongoDB', 'Tailwind CSS', 'SMTP'],
    github: 'https://github.com/rishabhtcodes/Mailing-Web-App',
    live: null,
  },
  {
    title: 'Portfolio', category: 'FRONTEND', number: '03',
    description: 'Personal portfolio website built with React and Vite featuring a clean monochrome design, theme toggle, custom cursor, and responsive layout.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    github: 'https://github.com/rishabhtcodes/Portfolio',
    live: null,
  },
  {
    title: 'Udyog Saarthi', category: 'WEB APPLICATION', number: '04',
    description: 'A job portal platform connecting job seekers with employers, built primarily with JavaScript and CSS for a smooth user experience.',
    tech: ['JavaScript', 'CSS', 'HTML'],
    github: 'https://github.com/rishabhtcodes/Udyog_Saarthi',
    live: null,
  },
  {
    title: 'Django REST APIs', category: 'BACKEND', number: '05',
    description: 'Assignments exploring different ways of sending data with Django REST Framework — covering serialization patterns, viewsets, and API design.',
    tech: ['Django', 'DRF', 'Python'],
    github: 'https://github.com/rishabhtcodes/Django_Rest_Api-s',
    live: null,
  },
  {
    title: 'Todo List App', category: 'WEB APPLICATION', number: '06',
    description: 'A clean Todo List app built with Django for adding, updating, and deleting tasks. Demonstrates Django templates, backend logic, and responsive UI.',
    tech: ['Django', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/rishabhtcodes/Todo_list',
    live: null,
  },
];

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <span className="section-label">SELECTED WORK</span>
        <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className={`section-subtitle fade-in stagger-1 ${inView ? 'visible' : ''}`}>
          Here are some of my recent projects showcasing my skills.
        </p>

        <div className="projects__grid">
          {projects.map((p, idx) => (
            <div key={p.title} className={`projects__card glass-card fade-in stagger-${Math.min(idx + 1, 6)} ${inView ? 'visible' : ''}`}>
              <div className="projects__card-top">
                <span className="projects__category">{p.category}</span>
                <span className="projects__number">{p.number}</span>
              </div>
              <h3 className="projects__title">{p.title}</h3>
              <p className="projects__desc">{p.description}</p>
              <div className="projects__tech">
                {p.tech.map((t) => <span key={t} className="projects__tag">{t}</span>)}
              </div>
              <div className="projects__links">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="projects__link">
                  <Github size={16} /> Code
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="projects__link">
                    <ExternalLink size={16} /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 40px; }
        .projects__card { padding: 24px; display: flex; flex-direction: column; }
        .projects__card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .projects__category { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; }
        .projects__number { font-family: var(--font-serif); font-size: 1.8rem; color: var(--border-color); line-height: 1; }
        .projects__title { font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; }
        .projects__desc { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; flex: 1; margin-bottom: 14px; }
        .projects__tech { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .projects__tag { padding: 4px 12px; font-size: 0.72rem; font-weight: 500; border-radius: var(--radius-xs); background: var(--accent-soft); color: var(--text-secondary); border: 1px solid var(--border-color); }
        .projects__links { display: flex; gap: 12px; }
        .projects__link {
          display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 500;
          color: var(--text-muted); padding: 6px 14px; border-radius: var(--radius-xs);
          border: 1px solid var(--border-color); transition: all 0.2s;
        }
        .projects__link:hover { color: var(--text-primary); border-color: var(--border-hover); }
        @media (max-width: 1024px) { .projects__grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .projects__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
