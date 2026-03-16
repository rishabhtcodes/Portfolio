import { motion } from 'framer-motion';

export default function Achievements({ achievements }) {
  return (
    <motion.section
      id="achievements"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="section-kicker">Achievements</span>
      <h2 className="section-title">Recognition blocks ready to be swapped with future API data.</h2>
      <p className="section-copy">
        The cards are data-driven placeholders now, so replacing the content with fetched achievements later is a straight data update.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="glass-panel rounded-[2rem] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/15 to-indigo-400/15 text-sky-200">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                  <p className="mt-1 text-sm text-sky-200">{achievement.subtitle}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                  {achievement.year}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{achievement.description}</p>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
