import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Certificates({ certificates }) {
  return (
    <motion.section
      id="certificates"
      className="section-shell"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className="section-kicker">Certificates</span>
      <h2 className="section-title">Professional certifications and recognized credentials.</h2>
      <p className="section-copy">
        Continuously learning and staying updated with the latest technologies and best practices in web development.
      </p>

      <div className="custom-scrollbar-horizontal mt-10 grid grid-flow-col grid-rows-2 gap-6 overflow-x-auto snap-x snap-mandatory pb-8">
        {certificates.map((cert, index) => {
          const Icon = resolvePortfolioIcon(cert.icon);

          return (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="glass-panel w-[calc(100vw-3rem)] shrink-0 snap-start rounded-2xl p-5 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/20 sm:w-[calc(50vw-4rem)] lg:w-[calc((1280px-12rem)/3)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/15 to-indigo-400/15 text-sky-200">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                  {cert.date}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">{cert.title}</h3>
              <p className="mt-1 text-sm text-sky-200">{cert.issuer}</p>
              <p className="mt-3 text-xs text-slate-400">ID: {cert.credentialId}</p>
              <a
                href={cert.credentialLink}
                target="_blank"
                rel="noreferrer"
                className="secondary-button mt-4 inline-flex text-sm"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Certificate
              </a>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
