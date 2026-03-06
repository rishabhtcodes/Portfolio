import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Activity, Code, Star, GitFork, Trophy } from 'lucide-react';

export default function GithubStats() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [stats, setStats] = useState(null);
    const username = 'rishabhtcodes';

    useEffect(() => {
        Promise.all([
            fetch(`https://api.github.com/users/${username}`).then((r) => r.ok ? r.json() : Promise.reject()),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then((r) => r.ok ? r.json() : Promise.reject()),
            fetch(`https://api.github.com/users/${username}/events?per_page=100`).then((r) => r.ok ? r.json() : Promise.reject()),
        ])
            .then(([user, repos, events]) => {
                const ownRepos = repos.filter((r) => !r.fork);
                const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
                const totalForks = ownRepos.reduce((sum, r) => sum + r.forks_count, 0);
                const langList = ownRepos.map((r) => r.language).filter(Boolean);
                const languages = new Set(langList);
                // Find most used language
                const langCount = {};
                langList.forEach((l) => { langCount[l] = (langCount[l] || 0) + 1; });
                const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

                // Count push events as a proxy for contributions
                const pushEvents = events.filter((e) => e.type === 'PushEvent');
                const totalCommits = pushEvents.reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);

                setStats({
                    projects: user.public_repos || 0,
                    contributions: totalCommits || '166+',
                    languages: languages.size,
                    stars: totalStars,
                    forks: totalForks,
                    topLang,
                });
            })
            .catch(() => {
                setStats({ projects: '12', contributions: '166+', languages: '5+', stars: '5', forks: '—', topLang: 'Python' });
            });
    }, []);

    const cards = stats
        ? [
            { icon: <BookOpen size={22} />, value: stats.projects, label: 'Projects' },
            { icon: <Activity size={22} />, value: stats.contributions, label: 'Contributions' },
            { icon: <Code size={22} />, value: stats.languages + '+', label: 'Languages' },
            { icon: <Star size={22} />, value: stats.stars, label: 'Total Stars' },
            { icon: <GitFork size={22} />, value: stats.forks, label: 'Total Forks' },
            { icon: <Trophy size={22} />, value: stats.topLang, label: 'Top Language' },
        ]
        : [];

    return (
        <section className="section" id="github" ref={ref}>
            <div className="container">
                <span className="section-label">OPEN SOURCE</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    GitHub <span className="gradient-text">Stats</span>
                </h2>
                <p className={`section-subtitle fade-in stagger-1 ${inView ? 'visible' : ''}`}>
                    My open-source activity on <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, textDecoration: 'underline' }}>@{username}</a>
                </p>
                <div className="gh__grid">
                    {cards.map((c, idx) => (
                        <div key={idx} className={`gh__card glass-card fade-in stagger-${Math.min(idx + 1, 6)} ${inView ? 'visible' : ''}`}>
                            <div className="gh__icon">{c.icon}</div>
                            <span className="gh__value">{c.value}</span>
                            <span className="gh__label">{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .gh__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
        .gh__card { padding: 28px 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
        .gh__icon { color: var(--text-muted); }
        .gh__value { font-size: 2rem; font-weight: 800; background: var(--gradient-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; }
        .gh__label { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
        @media (max-width: 768px) { .gh__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .gh__grid { grid-template-columns: 1fr; } }
      `}</style>
        </section>
    );
}
