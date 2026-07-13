import { useState } from 'react';
import { Github, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects({ projects }) {
  const [showModal, setShowModal] = useState(false);

  // Main page grid displays the first 3 "chosen" projects
  const chosenProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  return (
    <section id="projects">
      <div className="wrap">
        <span className="eyebrow" id="projectsEyebrow">
          Projects
        </span>
        <h2 className="section-title" id="projectsTitle">
          Selected builds focused on user experience, performance, and delivery.
        </h2>
        <p className="section-desc" id="projectsDesc">
          Real-world applications built from scratch — from design to deployment.
        </p>

        {/* Chosen/Featured projects grid */}
        <div className="project-grid" id="projectGrid">
          {chosenProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="project-card h-full"
            >
              {/* Thumbnail head */}
              <div className="project-thumb relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-105 z-10"
                  />
                ) : (
                  <div className="grid-overlay" />
                )}
                {/* Status chip */}
                <div className="status-chip z-20">
                  <span className="dot" />
                  {project.status?.toUpperCase()}
                </div>
              </div>

              {/* Body */}
              <div className="project-body">
                <h3>{project.title}</h3>
                <p className="custom-scrollbar overflow-y-auto h-[90px] pr-2 text-left">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="chip-row flex-nowrap overflow-x-auto custom-scrollbar-horizontal pb-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="chip flex-shrink-0">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="project-actions">
                  <a
                    className="btn btn-secondary btn-sm flex-1 justify-center gap-2"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  {project.isLive !== false && project.demo && (
                    <a
                      className="btn btn-primary btn-sm flex-1 justify-center"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Show More Projects Trigger */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="btn btn-secondary flex items-center gap-2 px-6 py-3 text-sm font-semibold transition"
            >
              Show More Projects <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Grid Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark translucent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[linear-gradient(180deg,#eceef3_0%,#dfe2ea_100%)] p-6 sm:p-8 md:p-10 shadow-2xl border border-[var(--line)] custom-scrollbar"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <span className="eyebrow">More Projects</span>
                <h2 className="section-title mt-2">Additional builds &amp; archives</h2>
                <p className="section-desc mt-1">Exploring other applications, algorithms, and sandbox implementations.</p>
              </div>

              {/* Floating Row of remaining projects */}
              <div className="flex flex-row flex-nowrap gap-6 overflow-x-auto pb-4 custom-scrollbar-horizontal items-stretch">
                {otherProjects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="project-card w-[295px] sm:w-[350px] flex-shrink-0"
                  >
                    {/* Thumbnail head */}
                    <div className="project-thumb relative overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-105 z-10"
                        />
                      ) : (
                        <div className="grid-overlay" />
                      )}
                      {/* Status chip */}
                      <div className="status-chip z-20">
                        <span className="dot" />
                        {project.status?.toUpperCase()}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p className="custom-scrollbar overflow-y-auto h-[90px] pr-2 text-left">
                        {project.description}
                      </p>

                      {/* Tech chips */}
                      <div className="chip-row flex-nowrap overflow-x-auto custom-scrollbar-horizontal pb-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="chip flex-shrink-0">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="project-actions">
                        <a
                          className="btn btn-secondary btn-sm flex-1 justify-center gap-2"
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                        {project.isLive !== false && project.demo && (
                          <a
                            className="btn btn-primary btn-sm flex-1 justify-center"
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
