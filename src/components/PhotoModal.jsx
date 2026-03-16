import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PhotoModal({ isOpen, onClose, photoUrl, name }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-h-[90vh] max-w-[90vw] sm:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute -right-12 -top-12 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-0 sm:top-0"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Photo */}
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-slate-950 shadow-2xl">
              <img
                src={photoUrl}
                alt={name}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Name and Title Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent px-6 py-8">
              <p className="text-center text-xl font-bold text-white sm:text-2xl">{name}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
