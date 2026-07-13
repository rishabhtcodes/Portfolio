import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ profile }) {
  const socials = [
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
    { label: 'Twitter', href: profile.twitter, icon: Twitter },
  ];

  return (
    <footer className="w-full pb-10 pt-6">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="glass-panel flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
            <p className="mt-0.5 text-xs text-slate-500">{profile.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {profile.name} · Built with React, Vite & Tailwind CSS
        </p>
      </div>

      <Link
        to="/admin/login"
        className="fixed bottom-3 right-4 z-40 text-[9px] font-medium uppercase tracking-[0.3em] text-slate-300 transition hover:text-slate-400"
      >
        rishabhtcodes
      </Link>
    </footer>
  );
}
