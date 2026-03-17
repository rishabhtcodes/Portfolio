import { FileText, FileType, X } from 'lucide-react';

export default function ResumeFormatModal({ isOpen, onClose, onSelectPdf, onSelectDoc, hasPdf, hasDoc }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-900/95 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.7)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-rose-200">Choose Format</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Download Resume</h3>
            <p className="mt-2 text-sm text-slate-300">Select the file type you want to download.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label="Close resume format picker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onSelectPdf}
            disabled={!hasPdf}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <FileType className="mr-2 h-4 w-4" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onSelectDoc}
            disabled={!hasDoc}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <FileText className="mr-2 h-4 w-4" />
            Download DOC/DOCX
          </button>
        </div>
      </div>
    </div>
  );
}
