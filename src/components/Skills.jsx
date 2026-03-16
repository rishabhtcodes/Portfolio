import { motion } from 'framer-motion';

export default function Skills({ skills }) {
  return (
    <motion.section
      id="skills"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="section-kicker">Skills</span>
      <h2 className="section-title">Core technologies I use to ship modern web products.</h2>
      <p className="section-copy">
        A complete view of my technical toolkit across languages, frameworks, databases, and development tools.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="glass-panel rounded-3xl p-6 transition duration-300 hover:-translate-y-2 hover:border-sky-300/20 hover:bg-white/8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-400/20 text-sky-200">
                {skill.logo ? (
                  <img src={skill.logo} alt={`${skill.name} logo`} className="h-7 w-7 object-contain" loading="lazy" />
                ) : Icon ? (
                  <Icon className="h-7 w-7" />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{skill.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{skill.description}</p>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
