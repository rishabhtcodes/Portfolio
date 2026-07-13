import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
  return (
    <motion.section
      id="projects"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span className="section-kicker">Projects</span>
      <h2 className="section-title">Selected builds focused on user experience, performance, and delivery.</h2>
      <p className="section-copy">
        Real-world applications built from scratch — from design to deployment.
      </p>

      {/* Horizontal scroll row */}
      <div className="mt-10 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="project-card group relative w-[88vw] max-w-[380px] shrink-0 snap-start overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-slate-700"
          >
            {/* Project image */}
            {project.image && (
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
            )}

            <div className="p-5">
              {/* Title + status */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-100">{project.title}</h3>
                <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <div className="mt-3 h-24 overflow-y-auto pr-1 custom-scrollbar">
                <p className="text-xs leading-6 text-slate-400">{project.description}</p>
              </div>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-700/60 bg-slate-800 px-2.5 py-0.5 text-[10px] font-medium text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-5 flex gap-2.5">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-700"
                >
                  <Github className="mr-1.5 h-3.5 w-3.5" />
                  Code
                </a>
                {project.isLive !== false && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
