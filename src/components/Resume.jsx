import { useState } from 'react';
import { Download, GraduationCap, Code, Layers, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import ResumeFormatModal from './ResumeFormatModal';

const ICONS = [GraduationCap, Code, Layers, Trophy];

export default function Resume({ resume }) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const downloadResumeFile = (url, fileName) => {
    if (!url) { window.alert('Resume file is not available yet.'); return; }
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = fileName;
    anchor.target = '_blank'; anchor.rel = 'noreferrer';
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
  };

  const handleResumeDownload = () => {
    const pdfUrl = resume.resumePdfLink || resume.resumeLink;
    const docUrl = resume.resumeDocLink;
    if (!pdfUrl && !docUrl) { window.alert('Resume file is not available yet.'); return; }
    setResumeModalOpen(true);
  };

  return (
    <motion.section
      id="resume"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <ResumeFormatModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        hasPdf={Boolean(resume.resumePdfLink || resume.resumeLink)}
        hasDoc={Boolean(resume.resumeDocLink)}
        onSelectPdf={() => { setResumeModalOpen(false); downloadResumeFile(resume.resumePdfLink || resume.resumeLink, 'resume.pdf'); }}
        onSelectDoc={() => { setResumeModalOpen(false); downloadResumeFile(resume.resumeDocLink, 'resume.docx'); }}
      />

      <span className="section-kicker">Resume</span>
      <h2 className="section-title">Download my resume and learn more about my background.</h2>
      <p className="section-copy">
        Full Stack Developer with expertise in modern web technologies and a track record of delivering production-ready applications.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resume.highlights.map((highlight, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass-panel p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex justify-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{highlight.label}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{highlight.detail}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <button type="button" onClick={handleResumeDownload} className="primary-button">
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </button>
      </div>
    </motion.section>
  );
}
