import { useState } from 'react';
import { ExternalLink, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Certificates({ certificates }) {
  const [showModal, setShowModal] = useState(false);

  // Normal laptop screen quantity: 6 displayed on the main page grid
  const chosenCerts = certificates.slice(0, 6);
  const otherCerts = certificates.slice(6);

  return (
    <section id="certificates">
      <div className="wrap">
        <span className="eyebrow" id="certEyebrow">
          Certificates
        </span>
        <h2 className="section-title" id="certTitle">
          Professional certifications and recognized credentials.
        </h2>
        <p className="section-desc" id="certDesc">
          Continuously learning and staying updated with the latest technologies and industry standards.
        </p>

        {/* Certificates grid */}
        <div className="cert-grid" id="certGrid">
          {chosenCerts.map((cert, index) => {
            const Icon = resolvePortfolioIcon(cert.icon);
            return (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="panel cert-card"
              >
                <div className="cert-top">
                  <div className="cert-icon">
                    <Icon className="h-4.5 w-4.5 text-[var(--accent-deep)]" />
                  </div>
                  <span className="cert-date">{cert.date}</span>
                </div>

                <h3>{cert.title}</h3>
                <div className="issuer">{cert.issuer}</div>

                <a
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link hover:underline"
                >
                  View Certificate <ExternalLink className="h-3 w-3" />
                </a>
              </motion.article>
            );
          })}
        </div>

        {/* Show More Trigger */}
        {certificates.length > 6 && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="btn btn-secondary flex items-center gap-2 px-6 py-3 text-sm font-semibold transition"
            >
              Show More Certificates <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Grid Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark translucent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Content Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[linear-gradient(180deg,#eceef3_0%,#dfe2ea_100%)] p-6 sm:p-8 md:p-10 shadow-2xl border border-[var(--line)] custom-scrollbar"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <span className="eyebrow">More Certificates</span>
                <h2 className="section-title mt-2">Additional achievements &amp; credentials</h2>
                <p className="section-desc mt-1">Exploring other certifications, online course completions, and workshops.</p>
              </div>

              {/* Grid of remaining certificates (2 columns, vertical scroll) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherCerts.map((cert, index) => {
                  const Icon = resolvePortfolioIcon(cert.icon);
                  return (
                    <motion.article
                      key={cert.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="panel cert-card"
                    >
                      <div className="cert-top">
                        <div className="cert-icon">
                          <Icon className="h-4.5 w-4.5 text-[var(--accent-deep)]" />
                        </div>
                        <span className="cert-date">{cert.date}</span>
                      </div>

                      <h3>{cert.title}</h3>
                      <div className="issuer">{cert.issuer}</div>

                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-link hover:underline"
                      >
                        View Certificate <ExternalLink className="h-3 w-3" />
                      </a>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
