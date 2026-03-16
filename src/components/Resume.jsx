import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Resume({ resume }) {
  return (
    <motion.section
      id="resume"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="section-kicker">Resume</span>
      <h2 className="section-title">Download my resume and learn more about my background.</h2>
      <p className="section-copy">
        Full Stack Developer with expertise in modern web technologies and a track record of delivering production-ready applications.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resume.highlights.map((highlight, index) => (
          <motion.div
            key={highlight.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="glass-panel rounded-2xl p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:bg-white/8"
          >
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
                <span className="text-lg font-bold">•</span>
              </div>
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{highlight.label}</h3>
            <p className="mt-2 text-sm text-slate-300">{highlight.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href={resume.resumeLink} target="_blank" rel="noreferrer" className="primary-button">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </a>
      </div>
    </motion.section>
  );
}
