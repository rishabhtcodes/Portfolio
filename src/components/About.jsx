import { Code2, Cpu, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutBanner from '../assets/about-banner.png';

const cards = [
  {
    icon: Code2,
    title: 'Frontend systems',
    text: 'Building fast, responsive interfaces with React, component-driven architecture, and clean UX decisions.',
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
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'RT';

  return (
    <motion.section
      id="about"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-32 overflow-hidden">
            <img src={aboutBanner} alt="" className="h-full w-full object-cover opacity-50 contrast-125 transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60" />
          </div>
          <div className="relative">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_24px_80px_rgba(14,165,233,0.18)] sm:mx-0">
              {displayPhoto ? (
                <img src={displayPhoto} alt="About profile" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-sky-200">{initials}</div>
              )}
            </div>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>{about.summary}</p>
              <p>{about.interests}</p>
            </div>
          </div>
        </div>

        <div>
          <span className="section-kicker">About Me</span>
          <h2 className="section-title">Developer-first design with practical engineering discipline.</h2>
          <p className="section-copy">{about.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="glass-panel rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:bg-white/8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-400">{card.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {about.techFocus.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
