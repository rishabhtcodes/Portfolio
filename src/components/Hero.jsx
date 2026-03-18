import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-20 sm:pt-24">
      <div className="absolute inset-0 -z-20 grid-overlay opacity-40" />
      <div className="absolute left-1/2 top-40 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-400/20 blur-[140px]" />
      <div className="section-shell min-h-screen py-14 sm:py-16 lg:flex lg:items-center">
        <div className="grid w-full gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="section-kicker">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              Available for freelance and full-time roles
            </div>
            <h1 className="mt-8 break-words text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-5 text-lg font-medium text-sky-200 sm:text-xl">{profile.title}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {profile.introduction}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#projects" className="primary-button">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="secondary-button">
                <Github className="mr-2 h-4 w-4" />
                GitHub Profile
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-xs text-slate-300 sm:text-sm">
              {profile.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="hero-orb absolute inset-x-8 top-10 -z-10 h-72 rounded-full bg-gradient-to-br from-sky-400/20 via-cyan-400/10 to-indigo-500/20 blur-3xl" />
            <div className="glass-panel mask-fade overflow-hidden p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">Developer Snapshot</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">React • Node • APIs</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="mt-6 space-y-4 overflow-x-auto font-mono text-sm leading-7 text-slate-300">
                <p>
                  <span className="text-sky-300">const</span> developer = {'{'}
                </p>
                <p className="pl-4">
                  name: <span className="text-cyan-200">&quot;{profile.name}&quot;</span>,
                </p>
                <p className="pl-4">
                  role: <span className="text-cyan-200">&quot;{profile.title}&quot;</span>,
                </p>
                <p className="pl-4">
                  focus: <span className="text-cyan-200">&quot;Scalable web products&quot;</span>,
                </p>
                <p className="pl-4">
                  stack: <span className="text-cyan-200">['React', 'Node.js', 'MongoDB']</span>,
                </p>
                <p className="pl-4">
                  shipping: <span className="text-emerald-300">true</span>
                </p>
                <p>{'}'};</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
