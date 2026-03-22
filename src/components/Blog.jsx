import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Calendar } from 'lucide-react';
import gridBg from '../assets/grid.jpg';

const articles = [
    { title: 'Building REST APIs with Django REST Framework', desc: 'A comprehensive guide to creating scalable REST APIs using DRF, serializers, and viewsets.', date: 'Feb 2026', tags: ['Django', 'REST API'], link: '#' },
    { title: 'Getting Started with React Hooks', desc: 'Understanding useState, useEffect, and custom hooks for modern React development.', date: 'Jan 2026', tags: ['React', 'JavaScript'], link: '#' },
    { title: 'CI/CD Pipeline for Django Projects', desc: 'Setting up automated testing and deployment with GitHub Actions and Docker.', date: 'Dec 2025', tags: ['DevOps', 'Docker'], link: '#' },
];

export default function Blog() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="section" id="blog" ref={ref}>
            <div className="container">
                <span className="section-label">WRITINGS</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    Latest <span className="gradient-text">Articles</span>
                </h2>
                <div className="blog__grid">
                    {articles.map((a, idx) => (
                        <a key={idx} href={a.link} className={`blog__card glass-card group relative overflow-hidden fade-in stagger-${idx + 1} ${inView ? 'visible' : ''}`}>
                            <img src={gridBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 transition duration-500 group-hover:opacity-30 group-hover:scale-110" />
                            <div className="blog__date"><Calendar size={12} /> {a.date}</div>
                            <h3 className="blog__title">{a.title} <ArrowUpRight size={14} /></h3>
                            <p className="blog__desc">{a.desc}</p>
                            <div className="blog__tags">
                                {a.tags.map((t) => <span key={t} className="blog__tag">{t}</span>)}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <style>{`
        .blog__grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 40px; }
        .blog__card { padding: 24px; display: flex; flex-direction: column; }
        .blog__date { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        .blog__title { font-size: 1rem; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
        .blog__desc { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.7; flex: 1; margin-bottom: 14px; }
        .blog__tags { display: flex; gap: 6px; }
        .blog__tag { padding: 4px 10px; font-size: 0.7rem; border-radius: var(--radius-xs); background: var(--accent-soft); color: var(--text-secondary); border: 1px solid var(--border-color); }
        @media (max-width: 768px) { .blog__grid { grid-template-columns: 1fr; } }
      `}</style>
        </section>
    );
}
