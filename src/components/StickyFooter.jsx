import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function StickyFooter({ profile }) {
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page we are
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate the distance from the bottom
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      const triggerDistance = 400; // Fade in when 400px from bottom

      // Calculate opacity: 0 to 1 as we approach the bottom
      let opacity = 0;
      if (distanceFromBottom < triggerDistance) {
        opacity = 1 - distanceFromBottom / triggerDistance;
      }

      setScrollOpacity(Math.min(opacity, 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socials = [
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
    { label: 'Twitter', href: profile.twitter, icon: Twitter },
  ];

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
      style={{ opacity: scrollOpacity }}
    >
      <div className="pointer-events-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel flex flex-col gap-4 rounded-2xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            {/* Brand info */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white sm:text-base">Rishabh Tiwari</p>
              <p className="text-xs text-slate-400 sm:text-sm">Full Stack Developer building modern experiences.</p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2 shrink-0">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:border-sky-300/25 hover:text-white hover:-translate-y-1"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Copyright text - smaller in sticky footer */}
          <p className="mt-2 text-center text-xs text-slate-500">
            © 2026 Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </motion.div>
  );
}
