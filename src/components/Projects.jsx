import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
  return (
    <motion.section
      id="projects"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span className="section-kicker">Projects</span>
      <h2 className="section-title">Selected builds focused on user experience, performance, and delivery.</h2>
      <p className="section-copy mt-4">
        Real-world applications built from scratch — from design to deployment.
      </p>

      {/* 3-column grid matching the mockup */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="project-card"
          >
            {/* Dark top header with CSS grid lines pattern */}
            <div className="project-card-header">
              {/* Project image overlaid on top of the grid pattern */}
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity"
                />
              )}
              {/* Slight gradient overlay at bottom of header */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/80 to-transparent" />
              {/* Status badge — top right */}
              <div className="absolute right-3 top-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  project.status?.toLowerCase() === 'live'
                    ? 'border border-emerald-700/40 bg-slate-900/80 text-emerald-400'
                    : 'border border-slate-600/40 bg-slate-900/80 text-slate-300'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    project.status?.toLowerCase() === 'live' ? 'bg-emerald-400' : 'bg-slate-400'
                  }`} />
                  {project.status}
                </span>
              </div>
            </div>

            {/* White card body */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-base font-bold text-slate-900" style={{ letterSpacing: '-0.01em' }}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-3">
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
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
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow"
                >
                  <Github className="mr-1.5 h-3.5 w-3.5" />
                  GitHub
                </a>
                {project.isLive !== false && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Live Demo
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
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
