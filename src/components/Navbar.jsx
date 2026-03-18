import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import PhotoModal from './PhotoModal';
import ResumeFormatModal from './ResumeFormatModal';

export default function Navbar({ links, resumePdfUrl, resumeDocUrl, profilePhoto, name }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (event, href) => {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    if (!resumePdfUrl && !resumeDocUrl) {
      window.alert('Resume file is not available yet.');
      return;
    }

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
        onSelectPdf={() => {
          setResumeModalOpen(false);
          downloadResumeFile(resumePdfUrl, 'resume.pdf');
        }}
        onSelectDoc={() => {
          setResumeModalOpen(false);
          downloadResumeFile(resumeDocUrl, 'resume.docx');
        }}
      />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={[
          'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition duration-300 sm:px-6',
          scrolled ? 'border-white/15 bg-slate-950/80 shadow-glass backdrop-blur-xl' : 'border-white/10 bg-white/5 backdrop-blur-md',
        ].join(' ')}
      >
        <div className="flex items-center gap-3">
          {/* Photo Logo - Clickable */}
          <button
            type="button"
            onClick={() => setPhotoModalOpen(true)}
            className="group relative h-10 w-10 overflow-hidden rounded-full border border-white/20 transition hover:border-sky-400/50"
            aria-label="View profile photo"
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={name}
                className="h-full w-full object-cover transition group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs font-bold text-sky-200">
                {name ? name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'RT'}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 to-indigo-500/0 transition group-hover:from-sky-400/20 group-hover:to-indigo-500/20" />
          </button>

          {/* Name - Links to Home */}
          <a href="#home" onClick={(event) => handleClick(event, '#home')} className="text-sm font-semibold tracking-[0.24em] text-slate-100 transition hover:text-sky-300 sm:text-base">
            {name}
          </a>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)} className="nav-link">
              {link.label}
            </a>
          ))}
          <button type="button" onClick={handleResumeDownload} className="secondary-button px-4 py-2 text-xs">
            <Download className="mr-2 h-4 w-4" />
            Resume
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      {open ? (
        <div className="mx-auto mt-3 max-h-[80vh] max-w-7xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-glass backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleClick(event, link.href)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button type="button" onClick={handleResumeDownload} className="secondary-button mt-2 w-full text-center text-sm">
              Resume
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
