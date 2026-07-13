import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects({ projects }) {
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

        {/* Project grid */}
        <div className="project-grid" id="projectGrid">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="project-card h-full"
            >
              {/* Thumbnail head */}
              <div className="project-thumb">
                <div className="grid-overlay" />
                {/* Status chip */}
                <div className="status-chip">
                  <span className="dot" />
                  {project.status?.toUpperCase()}
                </div>
              </div>

              {/* Body */}
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {/* Tech chips */}
                <div className="chip-row">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="chip">
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
      </div>
    </section>
  );
}
