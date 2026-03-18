import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ profile }) {
  const socials = [
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
    { label: 'Twitter', href: profile.twitter, icon: Twitter },
  ];

  return (
    <footer className="w-full pb-12 pt-8">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="glass-panel flex flex-col gap-6 rounded-[2rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-lg font-semibold text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-slate-400">{profile.title}</p>
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

      <Link
        to="/admin/login"
        className="fixed bottom-3 right-4 z-40 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-600 transition hover:text-slate-300"
      >
        rishabhtcodes
      </Link>
    </footer>
  );
}
