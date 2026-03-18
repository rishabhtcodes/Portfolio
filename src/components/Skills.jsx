import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 20 } },
};

export default function Skills({ skills }) {
  return (
    <motion.section
      id="skills"
      className="relative w-full overflow-hidden py-24 sm:py-32"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="section-kicker">Skills</span>
        <h2 className="section-title">Core technologies I use to ship modern web products.</h2>
        <p className="section-copy mb-16">
          A complete view of my technical toolkit across languages, frameworks, databases, and development tools.
        </p>

        {/* Clean Functional Grid Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            
            return (
              <motion.div
                variants={itemAnim}
                key={`card-${skill.name}-${index}`}
                className="glass-panel group relative flex flex-col items-start p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/[0.04] hover:shadow-sky-500/10 overflow-hidden"
              >
                {/* Background decorative logo */}
                <div className="pointer-events-none absolute -bottom-6 -right-6 z-0 opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-20" aria-hidden="true">
                  {skill.logo ? (
                    <img src={skill.logo} alt="" className="h-40 w-40 object-contain drop-shadow-2xl" loading="lazy" />
                  ) : Icon ? (
                    <Icon className="h-40 w-40" />
                  ) : null}
                </div>

                <div className="relative z-10 w-full">
                  <div className="mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.03] shadow-inner ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/[0.06]">
                    <div className="flex h-6 w-6 items-center justify-center text-sky-200">
                      {skill.logo ? (
                        <img src={skill.logo} alt={`${skill.name} logo`} className="h-full w-full object-contain drop-shadow-sm" loading="lazy" />
                      ) : Icon ? (
                        <Icon className="h-full w-full" />
                      ) : null}
                    </div>
                  </div>
                  
                  <h3 className="mb-1 text-[16px] font-semibold text-slate-100">{skill.name}</h3>
                  
                  <p className="text-[13px] leading-relaxed text-slate-400">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
