import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoModal from './PhotoModal';
import ResumeFormatModal from './ResumeFormatModal';

export default function Navbar({ links, resumePdfUrl, resumeDocUrl, profilePhoto, name }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <PhotoModal isOpen={photoModalOpen} onClose={() => setPhotoModalOpen(false)} photoUrl={profilePhoto} name={name} />
      <ResumeFormatModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        hasPdf={Boolean(resumePdfUrl)}
        hasDoc={Boolean(resumeDocUrl)}
        onSelectPdf={() => { setResumeModalOpen(false); downloadResumeFile(resumePdfUrl, 'resume.pdf'); }}
        onSelectDoc={() => { setResumeModalOpen(false); downloadResumeFile(resumeDocUrl, 'resume.docx'); }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={[
          'mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
          scrolled
            ? 'border border-slate-200 bg-white shadow-md shadow-slate-200/60'
            : 'border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md',
        ].join(' ')}
      >
        {/* Logo / Name */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="group relative h-8 w-8 overflow-hidden rounded-full border border-slate-200 transition hover:border-indigo-300"
            aria-label="View profile photo"
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt={name} className="h-full w-full object-cover transition group-hover:scale-110" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-indigo-600 text-[10px] font-bold text-white">
                {(name || 'RT').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
          </button>
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            {name}
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Resume button + mobile toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResumeDownload}
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 md:flex"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lg md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setOpen(false); handleResumeDownload(); }}
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
