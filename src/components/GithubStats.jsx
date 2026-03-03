import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GitBranch, Star, Users, BookOpen, Activity, Code } from 'lucide-react';

export default function GithubStats() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [stats, setStats] = useState(null);
    const username = 'rishabhtcodes';

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((r) => r.json())
            .then((data) => {
                setStats({
                    repos: data.public_repos || 0,
                    followers: data.followers || 0,
                    following: data.following || 0,
                    bio: data.bio || '',
                });
            })
            .catch(() => {
                setStats({ repos: '10+', followers: '—', following: '—', bio: '' });
            });
    }, []);

    const cards = stats
        ? [
            { icon: <BookOpen size={22} />, value: stats.repos, label: 'Repositories' },
            { icon: <Users size={22} />, value: stats.followers, label: 'Followers' },
            { icon: <Star size={22} />, value: stats.following, label: 'Following' },
            { icon: <Activity size={22} />, value: '118+', label: 'Contributions' },
            { icon: <GitBranch size={22} />, value: '7', label: 'Current Streak' },
            { icon: <Code size={22} />, value: '5+', label: 'Languages' },
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
