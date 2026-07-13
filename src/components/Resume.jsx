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
    <section id="resume">
      <ResumeFormatModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        hasPdf={Boolean(resume.resumePdfLink || resume.resumeLink)}
        hasDoc={Boolean(resume.resumeDocLink)}
        onSelectPdf={() => { setResumeModalOpen(false); downloadResumeFile(resume.resumePdfLink || resume.resumeLink, 'resume.pdf'); }}
        onSelectDoc={() => { setResumeModalOpen(false); downloadResumeFile(resume.resumeDocLink, 'resume.docx'); }}
      />

      <div className="wrap text-center">
        <span className="eyebrow" id="resumeEyebrow">
          Resume
        </span>
        <h2 className="section-title mx-auto" id="resumeTitle">
          Education &amp; Experience
        </h2>
        <p className="section-desc mx-auto" id="resumeDesc">
          Full Stack Developer with expertise in modern web technologies and a track record of delivering production-ready applications.
        </p>

        {/* Stat Grid */}
        <div className="stat-grid" id="statGrid">
          {resume.highlights.map((highlight, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="panel stat-card"
              >
                <div className="stat-icon">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="label">{highlight.label}</div>
                <div className="value">{highlight.detail}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="resume-cta">
          <button type="button" onClick={handleResumeDownload} className="btn btn-primary" id="resumeBtn">
            <Download className="h-4 w-4 mr-1" /> Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
