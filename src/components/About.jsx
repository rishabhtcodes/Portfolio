import { Code2, Cpu, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutBanner from '../assets/about-banner.png';

const cards = [
  {
    icon: Code2,
    title: 'Frontend systems',
    text: 'Building fast, responsive interfaces with React, component-driven architecture, and clean UX.',
  },
  {
    icon: Cpu,
    title: 'Backend thinking',
    text: 'Designing APIs, authentication flows, and data pipelines that scale with product needs.',
  },
  {
    icon: Globe2,
    title: 'Product mindset',
    text: 'Balancing engineering quality with delivery speed so ideas turn into usable software quickly.',
  },
];

export default function About({ about, name }) {
  const displayPhoto = about?.photo;
  const initials = (name || 'RT')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || 'RT';

  return (
    <motion.section
      id="about"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">

        {/* Left — dark photo panel */}
        <div className="group relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
          {/* Subtle banner at top */}
          <div className="absolute inset-x-0 top-0 h-28 overflow-hidden">
            <img src={aboutBanner} alt="" className="h-full w-full object-cover opacity-30 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
          </div>
          {/* Dot grid */}
          <div className="dot-grid absolute inset-0 opacity-30" />
          {/* Photo or initials */}
          <div className="relative z-10">
            {displayPhoto ? (
              <img
                src={displayPhoto}
                alt={name}
                className="h-44 w-44 rounded-2xl object-cover shadow-2xl ring-4 ring-slate-800"
              />
            ) : (
              <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-slate-900 text-6xl font-bold text-slate-700 ring-4 ring-slate-800">
                {initials}
              </div>
            )}
          </div>
          {/* Name below photo */}
          <div className="relative z-10 mt-6 text-center">
            <p className="text-base font-semibold text-slate-200">{name}</p>
            <p className="mt-1 text-sm text-slate-500">{about.tagline || 'Full Stack Developer'}</p>
          </div>
        </div>

        {/* Right — text + cards */}
        <div>
          <span className="section-kicker">About Me</span>
          <h2 className="section-title">Developer-first design with practical engineering discipline.</h2>

          <div className="section-copy mt-4 space-y-3">
            <p>{about.summary}</p>
            <p>{about.interests}</p>
          </div>

          {/* 3 feature cards */}
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="glass-panel p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{card.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Tech stack chips */}
          {about.techFocus && (
            <div className="mt-6 flex flex-wrap gap-2">
              {about.techFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
