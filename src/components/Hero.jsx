import { ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-20 sm:pt-24">
      {/* Subtle ambient blobs */}
      <div className="absolute -top-40 left-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-[100px]" />
      <div className="absolute top-20 right-1/4 -z-10 h-56 w-56 rounded-full bg-sky-100/60 blur-[80px]" />

      <div className="section-shell min-h-[90vh] py-14 sm:py-20 lg:flex lg:items-center">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-800 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              AVAILABLE FOR FREELANCE &amp; FULL-TIME ROLES
            </motion.div>

            <h1
              className="mt-7 text-5xl font-black text-slate-900 sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}
            >
              Hi, I&apos;m <span className="text-gradient">Rishabh</span>
              <br />
              <span className="text-slate-900">Kumar Tiwari</span>
            </h1>

            <p className="mt-4 text-sm font-medium text-slate-500 sm:text-base">
              Full Stack Developer &middot; C++ &middot; Django &middot; MERN Stack
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              {profile.introduction}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="primary-button">
                View Projects &rarr;
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="secondary-button">
                GitHub Profile
              </a>
            </div>

            {/* Highlight chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['C++ & Python', 'React + Node.js', 'MongoDB & MySQL', 'Problem Solving'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Dark code terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg"
          >
            {/* Glow behind terminal */}
            <div className="absolute inset-x-12 top-8 -z-10 h-64 rounded-full bg-indigo-400/20 blur-3xl" />

            {/* White snapshot wrapper container */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50">
              
              {/* Snapshot header */}
              <div className="flex items-center justify-between px-2 pb-4">
                <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400">
                  SYSTEM // developer.snapshot
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Embedded code panel */}
              <div className="rounded-2xl bg-slate-950 p-6 font-mono text-[12px] leading-6 text-slate-300 shadow-inner sm:p-8">
                <p className="text-slate-500">
                  <span>const</span> <span className="text-slate-300">developer</span> = <span className="text-slate-400">{'{'}</span>
                </p>
                <p className="pl-6">
                  <span className="text-sky-300">name</span>: <span className="text-amber-200">&quot;Rishabh Kumar Tiwari&quot;</span>,
                </p>
                <p className="pl-6">
                  <span className="text-sky-300">role</span>: <span className="text-amber-200">&quot;Full Stack Developer | Django | MERN Stack&quot;</span>,
                </p>
                <p className="pl-6">
                  <span className="text-sky-300">focus</span>: <span className="text-amber-200">&quot;Scalable web products&quot;</span>,
                </p>
                <p className="pl-6">
                  <span className="text-sky-300">stack</span>: <span className="text-slate-400">[</span>
                  <span className="text-amber-200">&quot;React&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;Node.js&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;MongoDB&quot;</span>,{' '}
                  <span className="text-amber-200">&quot;Django&quot;</span>
                  <span className="text-slate-400">]</span>,
                </p>
                <p className="pl-6">
                  <span className="text-sky-300">coffee</span>: <span className="text-amber-500">true</span>
                </p>
                <p className="text-slate-400">{'}'}</p>
              </div>

              {/* Snapshot status footer */}
              <div className="flex items-center gap-4 px-2 pt-4 font-mono text-[9px] font-bold tracking-widest text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  BUILD
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  TESTS
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  DEPLOY
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
