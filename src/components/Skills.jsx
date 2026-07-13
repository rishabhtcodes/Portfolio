import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export default function Skills({ skills }) {
  return (
    <section id="skills">
      <div className="wrap">
        <span className="eyebrow" id="skillsEyebrow">
          Skills
        </span>
        <h2 className="section-title" id="skillsTitle">
          Core technologies I use to ship modern web products.
        </h2>
        <p className="section-desc" id="skillsDesc">
          A complete view of my toolkit across programming languages, backend frameworks, databases, and tools.
        </p>

        {/* Skill grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="skill-grid"
          id="skillGrid"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const initials = skill.name.slice(0, 2).toUpperCase();
            return (
              <motion.div
                variants={item}
                key={`${skill.name}-${index}`}
                className="panel skill-card"
              >
                {/* Glyph */}
                <div className="skill-glyph">
                  {skill.logo ? (
                    <img src={skill.logo} alt="" className="h-4.5 w-4.5 object-contain" />
                  ) : Icon ? (
                    <Icon className="h-4.5 w-4.5 text-[var(--accent-deep)]" />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>

                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
