import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Certificates({ certificates }) {
  return (
    <motion.section
      id="certificates"
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <span className="section-kicker">Certificates</span>
      <h2 className="section-title">Professional certifications and recognized credentials.</h2>
      <p className="section-copy">
        Continuously learning and staying updated with the latest technologies and best practices.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, index) => {
          const Icon = resolvePortfolioIcon(cert.icon);
          return (
            <motion.article
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="glass-panel group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  {cert.date}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">{cert.title}</h3>
              <p className="mt-1 text-xs font-medium text-indigo-600">{cert.issuer}</p>
              <p className="mt-2 text-[11px] text-slate-400">ID: {cert.credentialId}</p>

              <div className="mt-4 flex-1" />

              <a
                href={cert.credentialLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center self-start rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                View Certificate
              </a>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
