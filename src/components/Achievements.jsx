import { motion } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Achievements({ achievements }) {
  return (
    <section id="achievements">
      <div className="wrap">
        <span className="eyebrow" id="achEyebrow">
          Achievements
        </span>
        <h2 className="section-title" id="achTitle">
          Recognition earned through building under pressure.
        </h2>
        <p className="section-desc" id="achDesc">
          Milestones and awards that reflect a commitment to quality and real-world impact.
        </p>

        {/* Achievements grid */}
        <div className="ach-grid" id="achGrid">
          {achievements.map((achievement, index) => {
            const Icon = resolvePortfolioIcon(achievement.icon);
            return (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="panel ach-card"
              >
                <div className="ach-top">
                  <div className="ach-badge">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="ach-date">{achievement.year}</span>
                </div>

                <h3>{achievement.title}</h3>
                <div className="org">{achievement.subtitle}</div>
                <p>{achievement.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
