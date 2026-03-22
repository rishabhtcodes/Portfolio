import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import gridBg from '../assets/grid.jpg';

const profiles = [
    { name: 'LeetCode', handle: 'rishabhtcodes', url: 'https://leetcode.com/rishabhtcodes', emoji: '🟡' },
    { name: 'HackerRank', handle: 'rishabhtcodes', url: 'https://hackerrank.com/rishabhtcodes', emoji: '🟢' },
    { name: 'CodeChef', handle: 'rishabhtcodes', url: 'https://codechef.com/users/rishabhtcodes', emoji: '⚪' },
    { name: 'GeeksforGeeks', handle: 'rishabhtcodes', url: 'https://geeksforgeeks.org/user/rishabhtcodes', emoji: '🟢' },
];

export default function CodingProfiles() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="section" id="coding" ref={ref}>
            <div className="container">
                <span className="section-label">COMPETITIVE</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    Coding <span className="gradient-text">Profiles</span>
                </h2>
                <div className="coding__grid">
                    {profiles.map((p, idx) => (
                        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={`coding__card glass-card group relative overflow-hidden fade-in stagger-${idx + 1} ${inView ? 'visible' : ''}`}>
                            <img src={gridBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 transition duration-500 group-hover:opacity-30 group-hover:scale-110" />
                            <span className="coding__emoji">{p.emoji}</span>
                            <div>
                                <h3 className="coding__name">{p.name}</h3>
                                <span className="coding__handle">@{p.handle}</span>
                            </div>
                            <ExternalLink size={16} className="coding__arrow" />
                        </a>
                    ))}
                </div>
            </div>
            <style>{`
        .coding__grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-top: 40px; }
        .coding__card { padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
        .coding__emoji { font-size: 2rem; }
        .coding__name { font-size: 1rem; font-weight: 700; }
        .coding__handle { font-size: 0.8rem; color: var(--text-muted); }
        .coding__arrow { margin-left: auto; color: var(--text-muted); }
        @media (max-width: 600px) { .coding__grid { grid-template-columns: 1fr; } }
      `}</style>
        </section>
    );
}
