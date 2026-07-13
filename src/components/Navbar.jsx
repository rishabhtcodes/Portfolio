import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoModal from './PhotoModal';
import ResumeFormatModal from './ResumeFormatModal';

export default function Navbar({ links, resumePdfUrl, resumeDocUrl, profilePhoto, name }) {
  const [open, setOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleClick = (event, href) => {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const downloadResumeFile = (url, fileName) => {
    if (!url) { window.alert('Resume file is not available yet.'); return; }
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = fileName;
    anchor.target = '_blank'; anchor.rel = 'noreferrer';
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
  };

  const handleResumeDownload = () => {
    if (!resumePdfUrl && !resumeDocUrl) { window.alert('Resume file is not available yet.'); return; }
    setResumeModalOpen(true);
  };

  return (
    <>
      <PhotoModal isOpen={photoModalOpen} onClose={() => setPhotoModalOpen(false)} photoUrl={profilePhoto} name={name} />
      <ResumeFormatModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        hasPdf={Boolean(resumePdfUrl)}
        hasDoc={Boolean(resumeDocUrl)}
        onSelectPdf={() => { setResumeModalOpen(false); downloadResumeFile(resumePdfUrl, 'resume.pdf'); }}
        onSelectDoc={() => { setResumeModalOpen(false); downloadResumeFile(resumeDocUrl, 'resume.docx'); }}
      />

      {/* Brushed metal top bezel */}
      <div className="metal-bezel" />

      <nav className="nav">
        <div className="wrap nav-inner">
          {/* Brand/Logo */}
          <div className="brand">
            <button
              type="button"
              onClick={() => setPhotoModalOpen(true)}
              className="brand-mark focus:outline-none"
              aria-label="View profile photo"
            >
              RT
            </button>
            <a
              href="#home"
              onClick={(e) => handleClick(e, '#home')}
              id="brandName"
              className="hover:text-[var(--accent)] transition-colors duration-150"
            >
              {name}
            </a>
          </div>

          {/* Desktop links */}
          <div className="nav-links" id="navLinks">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Nav CTA */}
          <div className="nav-cta">
            <button
              type="button"
              onClick={handleResumeDownload}
              className="btn btn-secondary btn-sm hidden sm:inline-flex"
              id="navResume"
            >
              Resume
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 sm:hidden"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="mx-auto border-t border-[var(--line)] bg-[var(--panel-soft)] px-6 py-4 sm:hidden"
            >
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="block rounded-xl px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] hover:bg-white hover:text-[var(--ink)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => { setOpen(false); handleResumeDownload(); }}
                  className="btn btn-secondary btn-sm w-full justify-center mt-2"
                >
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
