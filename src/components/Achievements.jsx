import { motion } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Achievements({ achievements }) {
  return (
    <motion.section
      id="achievements"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span className="section-kicker">Achievements</span>
      <h2 className="section-title">Recognition earned through building under pressure.</h2>
      <p className="section-copy">
        Milestones and awards that reflect a commitment to quality and real-world impact.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = resolvePortfolioIcon(achievement.icon);
          return (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass-panel group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {achievement.year}
                </span>
              </div>

              <h3 className="mt-5 text-sm font-semibold text-slate-900">{achievement.title}</h3>
              <p className="mt-1 text-xs font-medium text-indigo-600">{achievement.subtitle}</p>
              <p className="mt-3 text-xs leading-6 text-slate-500">{achievement.description}</p>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
