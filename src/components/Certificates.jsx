import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolvePortfolioIcon } from '../lib/iconMaps';

export default function Certificates({ certificates }) {
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

        {/* Certificate grid */}
        <div className="cert-grid" id="certGrid">
          {certificates.map((cert, index) => {
            const Icon = resolvePortfolioIcon(cert.icon);
            return (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
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
      </div>
    </section>
  );
}
