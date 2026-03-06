import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

/* ── Custom overrides for specific repos ──
   Any repo whose name matches a key here will use these values
   instead of the auto-generated ones from the GitHub API.
   Add a 'live' key if the project has a live deployment.       */
const overrides = {
  'E-Commerce': {
    title: 'R.onny Store',
    category: 'E-COMMERCE',
    description: 'A full-featured e-commerce platform built with Django, PostgreSQL, and a modern minimal UI. Includes user auth, cart, orders, REST API with JWT, and email notifications.',
    tech: ['Django', 'PostgreSQL', 'DRF', 'Tailwind CSS'],
    live: 'https://e-commerce-ebon-eta-82.vercel.app/',
  },
  'Mailing-Web-App': {
    title: 'Mailing Web App',
    category: 'WEB APPLICATION',
    description: 'A web app for composing and sending emails via SMTP with user authentication, email history tracking, and a responsive Tailwind CSS UI. Uses MongoDB via djongo.',
    tech: ['Django', 'MongoDB', 'Tailwind CSS', 'SMTP'],
  },
  'Portfolio': {
    title: 'Portfolio',
    category: 'FRONTEND',
    description: 'Personal portfolio website built with React and Vite featuring a clean monochrome design, theme toggle, custom cursor, and responsive layout.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
  },
  'Udyog_Saarthi': {
    title: 'Udyog Saarthi',
    category: 'WEB APPLICATION',
    description: 'A job portal platform connecting job seekers with employers, built primarily with JavaScript and CSS for a smooth user experience.',
    tech: ['JavaScript', 'CSS', 'HTML'],
  },
  'Django_Rest_Api-s': {
    title: 'Django REST APIs',
    category: 'BACKEND',
    description: 'Assignments exploring different ways of sending data with Django REST Framework — covering serialization patterns, viewsets, and API design.',
    tech: ['Django', 'DRF', 'Python'],
  },
  'Todo_list': {
    title: 'Todo List App',
    category: 'WEB APPLICATION',
    description: 'A clean Todo List app built with Django for adding, updating, and deleting tasks. Demonstrates Django templates, backend logic, and responsive UI.',
    tech: ['Django', 'JavaScript', 'Tailwind CSS'],
  },
};

/* ── Fallback data (used if API call fails) ── */
const fallbackProjects = [
  { title: 'R.onny Store', category: 'E-COMMERCE', number: '01', description: overrides['E-Commerce'].description, tech: overrides['E-Commerce'].tech, github: 'https://github.com/rishabhtcodes/E-Commerce', live: 'https://e-commerce-ebon-eta-82.vercel.app/' },
  { title: 'Mailing Web App', category: 'WEB APPLICATION', number: '02', description: overrides['Mailing-Web-App'].description, tech: overrides['Mailing-Web-App'].tech, github: 'https://github.com/rishabhtcodes/Mailing-Web-App', live: null },
  { title: 'Portfolio', category: 'FRONTEND', number: '03', description: overrides['Portfolio'].description, tech: overrides['Portfolio'].tech, github: 'https://github.com/rishabhtcodes/Portfolio', live: null },
  { title: 'Udyog Saarthi', category: 'WEB APPLICATION', number: '04', description: overrides['Udyog_Saarthi'].description, tech: overrides['Udyog_Saarthi'].tech, github: 'https://github.com/rishabhtcodes/Udyog_Saarthi', live: null },
  { title: 'Django REST APIs', category: 'BACKEND', number: '05', description: overrides['Django_Rest_Api-s'].description, tech: overrides['Django_Rest_Api-s'].tech, github: 'https://github.com/rishabhtcodes/Django_Rest_Api-s', live: null },
  { title: 'Todo List App', category: 'WEB APPLICATION', number: '06', description: overrides['Todo_list'].description, tech: overrides['Todo_list'].tech, github: 'https://github.com/rishabhtcodes/Todo_list', live: null },
];

/* ── Helper: guess a category from the repo language ── */
function guessCategory(lang) {
  if (!lang) return 'PROJECT';
  const l = lang.toLowerCase();
  if (['python', 'java', 'go', 'ruby'].includes(l)) return 'BACKEND';
  if (['javascript', 'typescript', 'html', 'css', 'vue'].includes(l)) return 'FRONTEND';
  return 'PROJECT';
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [projects, setProjects] = useState(fallbackProjects);
  const username = 'rishabhtcodes';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then((r) => {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then((repos) => {
        // Filter out forks, sort by stars then updated
        const own = repos
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 6);

        const mapped = own.map((repo, idx) => {
          const ov = overrides[repo.name] || {};
          return {
            title: ov.title || repo.name.replace(/[-_]/g, ' '),
            category: ov.category || guessCategory(repo.language),
            number: String(idx + 1).padStart(2, '0'),
            description: ov.description || repo.description || 'A project by ' + username,
            tech: ov.tech || [repo.language].filter(Boolean),
            github: repo.html_url,
            live: ov.live || (repo.homepage || null),
          };
        });
        setProjects(mapped);
      })
      .catch(() => {
        /* keep fallback data */
      });
  }, []);

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
