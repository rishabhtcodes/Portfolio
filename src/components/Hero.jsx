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
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="section-kicker"
            >
              Available for freelance and full-time roles
            </motion.span>

            <h1
              className="mt-7 text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">{profile.name}</span>
            </h1>

            <p className="mt-4 text-sm font-medium text-slate-500 sm:text-base">{profile.title}</p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              {profile.introduction}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="primary-button">
                View Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="secondary-button">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </div>

            {/* Highlight chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {profile.highlights.map((item) => (
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

            <div className="code-panel overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900/60 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-xs text-slate-500 font-mono">developer.js</span>
              </div>

              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-7 sm:p-8">
                <p className="text-slate-400">
                  <span className="text-indigo-400">const</span>{' '}
                  <span className="text-sky-300">developer</span>{' '}
                  <span className="text-slate-400">=</span>{' '}
                  <span className="text-slate-300">{'{'}</span>
                </p>
                <p className="pl-6 text-slate-300">
                  <span className="text-sky-300">name</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-emerald-400">&quot;{profile.name}&quot;</span>
                  <span className="text-slate-400">,</span>
                </p>
                <p className="pl-6 text-slate-300">
                  <span className="text-sky-300">role</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-emerald-400">&quot;{profile.title}&quot;</span>
                  <span className="text-slate-400">,</span>
                </p>
                <p className="pl-6 text-slate-300">
                  <span className="text-sky-300">focus</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-emerald-400">&quot;Scalable web products&quot;</span>
                  <span className="text-slate-400">,</span>
                </p>
                <p className="pl-6 text-slate-300">
                  <span className="text-sky-300">stack</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-amber-300">['React', 'Node.js', 'MongoDB']</span>
                  <span className="text-slate-400">,</span>
                </p>
                <p className="pl-6 text-slate-300">
                  <span className="text-sky-300">openToWork</span>
                  <span className="text-slate-400">: </span>
                  <span className="text-indigo-400">true</span>
                </p>
                <p className="text-slate-300">{'};'}</p>
                <p className="mt-4 text-slate-500">
                  <span className="text-slate-600">// </span>
                  <span className="animate-pulse">▋</span>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
