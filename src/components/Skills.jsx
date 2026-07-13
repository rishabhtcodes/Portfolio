import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function Skills({ skills }) {
  return (
    <motion.section
      id="skills"
      className="relative w-full overflow-hidden py-20 sm:py-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <span className="section-kicker">Skills</span>
        <h2 className="section-title">Core technologies I use to ship modern web products.</h2>
        <p className="section-copy mb-12">
          A complete view of my technical toolkit across languages, frameworks, databases, and tools.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                variants={item}
                key={`${skill.name}-${index}`}
                className="glass-panel group relative flex flex-col items-start overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Faded watermark logo */}
                <div
                  className="pointer-events-none absolute -bottom-4 -right-4 z-0 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]"
                  aria-hidden="true"
                >
                  {skill.logo ? (
                    <img src={skill.logo} alt="" className="h-24 w-24 object-contain" loading="lazy" />
                  ) : Icon ? (
                    <Icon className="h-24 w-24" />
                  ) : null}
                </div>

                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100 transition-transform duration-200 group-hover:scale-105">
                    {skill.logo ? (
                      <img src={skill.logo} alt={`${skill.name} logo`} className="h-5 w-5 object-contain" loading="lazy" />
                    ) : Icon ? (
                      <Icon className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <span className="text-xs font-bold text-indigo-600">{skill.name[0]}</span>
                    )}
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-900">{skill.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{skill.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
