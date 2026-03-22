import { useState } from 'react';
import { Download, GraduationCap, Code, Layers, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import ResumeFormatModal from './ResumeFormatModal';
import gridBg from '../assets/resume_grid.jpg';

export default function Resume({ resume }) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const downloadResumeFile = (url, fileName) => {
    if (!url) {
      window.alert('Resume file is not available yet.');
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const handleResumeDownload = () => {
    const pdfUrl = resume.resumePdfLink || resume.resumeLink;
    const docUrl = resume.resumeDocLink;

    if (!pdfUrl && !docUrl) {
      window.alert('Resume file is not available yet.');
      return;
    }

    setResumeModalOpen(true);
  };

  return (
    <motion.section
      id="resume"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ResumeFormatModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        hasPdf={Boolean(resume.resumePdfLink || resume.resumeLink)}
        hasDoc={Boolean(resume.resumeDocLink)}
        onSelectPdf={() => {
          setResumeModalOpen(false);
          downloadResumeFile(resume.resumePdfLink || resume.resumeLink, 'resume.pdf');
        }}
        onSelectDoc={() => {
          setResumeModalOpen(false);
          downloadResumeFile(resume.resumeDocLink, 'resume.docx');
        }}
      />

      <span className="section-kicker">Resume</span>
      <h2 className="section-title">Download my resume and learn more about my background.</h2>
      <p className="section-copy">
        Full Stack Developer with expertise in modern web technologies and a track record of delivering production-ready applications.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resume.highlights.map((highlight, index) => {
          const icons = [GraduationCap, Code, Layers, Trophy];
          const Icon = icons[index % icons.length];

          return (
            <div
              key={highlight.label}
              className={`glass-panel group relative overflow-hidden rounded-2xl p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-sky-300/20 hover:bg-white/8`}
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
            >
              <img src={gridBg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 transition duration-500 group-hover:opacity-30 group-hover:scale-110" />
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200 shadow-inner ring-1 ring-sky-300/20">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-slate-100">{highlight.label}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{highlight.detail}</p>
            </div>
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
