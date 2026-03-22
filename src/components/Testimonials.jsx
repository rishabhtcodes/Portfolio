import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import gridBg from '../assets/grid.jpg';

const testimonials = [
    { text: '"Rishabh delivered an outstanding e-commerce platform. His Django expertise and attention to detail are impressive."', name: 'Project Client', role: 'E-Commerce Project' },
    { text: '"Great collaborator during hackathons. His full-stack skills and problem-solving ability make him a valuable team member."', name: 'Hackathon Teammate', role: 'LPU Hackathon' },
    { text: '"Rishabh\'s REST API implementations are clean and well-documented. He follows best practices consistently."', name: 'Code Reviewer', role: 'Open Source Contributor' },
];

export default function Testimonials() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrent((i) => (i + 1) % testimonials.length), 5000);
        return () => clearInterval(timer);
    }, []);

    const t = testimonials[current];

    return (
        <section className="section" id="testimonials" ref={ref}>
            <div className="container">
                <span className="section-label">FEEDBACK</span>
                <h2 className={`section-title fade-in ${inView ? 'visible' : ''}`}>
                    What People <span className="gradient-text">Say</span>
                </h2>
                <div className={`testi glass-card group relative overflow-hidden fade-in stagger-1 ${inView ? 'visible' : ''}`}>
                    <img src={gridBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-5 transition duration-500 group-hover:opacity-15 group-hover:scale-110" />
                    <Quote size={32} className="testi__quote" />
                    <p className="testi__text">{t.text}</p>
                    <div className="testi__author">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                    </div>
                    <div className="testi__nav">
                        <button onClick={() => setCurrent((current - 1 + testimonials.length) % testimonials.length)}><ChevronLeft size={18} /></button>
                        <div className="testi__dots">
                            {testimonials.map((_, i) => <span key={i} className={`testi__dot ${i === current ? 'testi__dot--active' : ''}`} onClick={() => setCurrent(i)} />)}
                        </div>
                        <button onClick={() => setCurrent((current + 1) % testimonials.length)}><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>
            <style>{`
        .testi { max-width: 700px; margin: 40px auto 0; padding: 40px; text-align: center; }
        .testi__quote { color: var(--text-muted); opacity: 0.3; margin-bottom: 20px; }
        .testi__text { font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); font-style: italic; margin-bottom: 24px; }
        .testi__author strong { display: block; font-size: 0.95rem; }
        .testi__author span { font-size: 0.8rem; color: var(--text-muted); }
        .testi__nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 24px; }
        .testi__nav button { background: none; border: 1px solid var(--border-color); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
        .testi__nav button:hover { border-color: var(--border-hover); }
        .testi__dots { display: flex; gap: 8px; }
        .testi__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-color); cursor: pointer; transition: all 0.2s; }
        .testi__dot--active { background: var(--accent); width: 24px; border-radius: 4px; }
      `}</style>
        </section>
    );
}
