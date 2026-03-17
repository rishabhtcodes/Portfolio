import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { getAdminToken, setAdminToken } from '../lib/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (getAdminToken()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email, password },
      });

      setAdminToken(payload.token);
      navigate(location.state?.from?.pathname || '/admin/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between border-r border-white/10 bg-gradient-to-br from-rose-500/12 via-slate-900 to-red-500/12 p-10 lg:flex">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-rose-300/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">
                <ShieldCheck className="h-4 w-4" />
                Admin Access
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight">Manage your portfolio without touching source files.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                Sign in to create, update, and publish projects, skills, certificates, achievements, resume links, and profile content directly from the dashboard.
              </p>
            </div>
            <p className="text-sm text-slate-400">Node.js, Express, MongoDB Atlas, JWT auth, and a React admin dashboard.</p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              <p className="text-sm uppercase tracking-[0.24em] text-rose-200">Rishabh Portfolio Admin</p>
              <h2 className="mt-4 text-3xl font-semibold">Sign in</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">Use the admin credentials configured in your backend environment to unlock the dashboard.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="admin-email">Email</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-300/40"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-red-400 to-rose-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(244,63,94,0.35)] disabled:cursor-not-allowed disabled:opacity-70">
                  <LockKeyhole className="mr-2 h-4 w-4" />
                  {submitting ? 'Signing in...' : 'Access Dashboard'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
