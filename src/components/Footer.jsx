import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ profile }) {
  const socials = [
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
    { label: 'Twitter', href: profile.twitter, icon: Twitter },
  ];

  return (
    <footer className="w-full pt-8">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="glass-panel flex flex-col gap-6 rounded-[2rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-lg font-semibold text-white">Rishabh Tiwari</p>
            <p className="mt-1 text-sm text-slate-400">Full Stack Developer building modern web experiences.</p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-sky-300/25 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/20" />

      <div className="pb-6 pt-4">
        <p className="text-center text-sm text-slate-500">© 2026 Rishabh Tiwari. Built with React, Vite, Tailwind CSS, and deployed on Vercel.</p>
      </div>
    </footer>
  );
}
