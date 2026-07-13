import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

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

            const renderIcon = () => {
              const iconName = skill.languageIcon;
              if (iconName) {
                // Treat as image URL or base64 data
                if (iconName.startsWith('http') || iconName.startsWith('/') || iconName.startsWith('data:')) {
                  return <img src={iconName} alt="" className="w-full h-full object-contain p-1.5" />;
                }
                // Treat as dynamic Lucide Icon
                const LucideIcon = LucideIcons[iconName];
                if (LucideIcon) {
                  return <LucideIcon className="h-5 w-5 text-[var(--accent-deep)]" />;
                }
                // Treat as Devicon / FontAwesome class name
                return <i className={`${iconName} text-lg`} style={{ fontSize: '18px' }}></i>;
              }

              if (skill.logo) {
                return <img src={skill.logo} alt="" className="w-full h-full object-contain p-1.5" />;
              }

              if (Icon) {
                return <Icon className="h-5 w-5 text-[var(--accent-deep)]" />;
              }

              return <span>{initials}</span>;
            };

            const hasCustomBg = !!skill.gridBg;

            return (
              <motion.div
                variants={item}
                key={`${skill.name}-${index}`}
                className={`panel skill-card ${hasCustomBg ? 'has-custom-bg text-white' : ''}`}
                style={hasCustomBg ? { background: skill.gridBg } : {}}
              >
                {/* Glyph */}
                <div className="skill-glyph">
                  {renderIcon()}
                </div>

                <h3 className={hasCustomBg ? 'text-white' : ''}>{skill.name}</h3>
                <p className={hasCustomBg ? 'text-white/80' : ''}>{skill.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

