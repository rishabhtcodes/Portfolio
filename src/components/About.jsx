import { motion } from 'framer-motion';

const cards = [
  {
    num: '01',
    title: 'Frontend systems',
    text: 'Building fast, responsive interfaces with React, component-driven architecture, and clean UX.',
  },
  {
    num: '02',
    title: 'Backend thinking',
    text: 'Designing APIs, authentication flows, and data pipelines that scale with product needs.',
  },
  {
    num: '03',
    title: 'Product mindset',
    text: 'Balancing engineering quality with delivery speed so ideas turn into usable software quickly.',
  },
];

export default function About({ about, name }) {
  const initials = (name || 'RT')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'RT';

  return (
    <section id="about">
      <div className="wrap">
        <span className="eyebrow" id="aboutEyebrow">
          About
        </span>
        <h2 className="section-title" id="aboutTitle">
          Developer-first design with practical engineering discipline.
        </h2>

        <div className="about-grid">
          {/* Left — Portrait */}
          <div className="about-portrait">
            <div className="grid-overlay" />
            <div className="initials">{initials}</div>
          </div>

          {/* Right — Info */}
          <div>
            <div id="aboutParas" className="space-y-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              <p>{about.summary}</p>
              <p>{about.interests}</p>
            </div>

            {/* Focus Cards */}
            <div className="focus-cards" id="focusCards">
              {cards.map((card) => (
                <div key={card.num} className="panel focus-card">
                  <span className="num">{card.num}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>

            {/* Stack Chips */}
            {about.techFocus && (
              <div className="chip-row" id="aboutStack">
                {about.techFocus.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
