import { FileText, FileType, X } from 'lucide-react';

export default function ResumeFormatModal({ isOpen, onClose, onSelectPdf, onSelectDoc, hasPdf, hasDoc }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Choose Format</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">Download Resume</h3>
            <p className="mt-1 text-sm text-slate-500">Select the file type you want to download.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-2.5">
          <button
            type="button"
            onClick={onSelectPdf}
            disabled={!hasPdf}
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileType className="mr-2 h-4 w-4" />
            Download PDF
          </button>
          <button
            type="button"
            onClick={onSelectDoc}
            disabled={!hasDoc}
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FileText className="mr-2 h-4 w-4" />
            Download DOC/DOCX
          </button>
        </div>
      </div>
    </div>
  );
}
