import { Link } from 'react-router-dom';

export default function Footer({ profile }) {
  return (
    <footer className="footer relative">
      <div className="wrap footer-inner">
        <div>
          <div className="footer-brand" id="footerName">
            {profile.name}
          </div>
          <div className="footer-tag" id="footerTag">
            {profile.title}
          </div>
        </div>
        <div className="led-row">
          <div className="led">
            <span className="led-dot on" />
            SITE ONLINE
          </div>
        </div>
      </div>

      <Link
        to="/admin/login"
        className="fixed bottom-3 right-4 z-40 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400 transition hover:text-slate-600"
      >
        rishabhtcodes
      </Link>
    </footer>
  );
}
