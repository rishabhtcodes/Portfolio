import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
  return (
    <motion.section
      id="projects"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div>
        <div>
          <span className="section-kicker">Projects</span>
          <h2 className="section-title">Selected builds focused on user experience, performance, and delivery.</h2>
        </div>
      </div>

      <div className="mt-10 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="glass-panel w-[85vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-2 hover:border-sky-300/25"
          >
            <img src={project.image} alt={project.title} className="h-52 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                  {project.status}
                </span>
              </div>
              <div className="mt-4 h-32 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-sm leading-7 text-slate-300">{project.description}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-sky-200 ring-1 ring-inset ring-white/10">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a href={project.github} target="_blank" rel="noreferrer" className="secondary-button flex-1 px-4 py-2 text-sm">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
                {project.isLive !== false && project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="primary-button flex-1 px-4 py-2 text-sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
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
