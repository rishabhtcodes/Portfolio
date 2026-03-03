import { useInView } from 'react-intersection-observer';
import { Download, FileText, Code, Briefcase, GraduationCap } from 'lucide-react';

const highlights = [
    { icon: <Code size={20} />, label: 'Full Stack Dev', detail: 'Django & React' },
    { icon: <GraduationCap size={20} />, label: 'B.Tech CSE', detail: 'LPU (2023-2027)' },
    { icon: <Briefcase size={20} />, label: 'Projects', detail: '10+ Completed' },
    { icon: <FileText size={20} />, label: 'Open Source', detail: 'Active Contributor' },
];

export default function ResumeSection() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="section" id="resume" ref={ref}>
            <div className="container" style={{ textAlign: 'center' }}>
                <span className="section-label" style={{ justifyContent: 'center' }}>RESUME</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    Download My <span className="gradient-text">Resume</span>
                </h2>
                <div className="resume__highlights">
                    {highlights.map((h, idx) => (
                        <div key={idx} className={`resume__hl glass-card fade-in stagger-${idx + 1} ${inView ? 'visible' : ''}`}>
                            <div className="resume__icon">{h.icon}</div>
                            <strong>{h.label}</strong>
                            <span>{h.detail}</span>
                        </div>
                    ))}
                </div>
                <a href="/Rishabh_Kumar_Tiwari_Resume.pdf" target="_blank" rel="noopener noreferrer" className={`btn btn-primary resume__btn fade-in stagger-5 ${inView ? 'visible' : ''}`}>
                    <Download size={18} /> Download Resume
                </a>
            </div>
            <style>{`
        .resume__highlights { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin: 40px 0; }
        .resume__hl { padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .resume__icon { color: var(--text-secondary); }
        .resume__hl strong { font-size: 0.9rem; }
        .resume__hl span { font-size: 0.78rem; color: var(--text-muted); }
        .resume__btn { margin-top: 8px; padding: 14px 32px; font-size: 0.95rem; }
        @media (max-width: 768px) { .resume__highlights { grid-template-columns: repeat(2,1fr); } }
      `}</style>
        </section>
    );
}
