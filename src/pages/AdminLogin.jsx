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
    <div className="min-h-screen bg-[#0B0F12] px-6 py-10 text-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[2.5rem] border border-[#1A242B] bg-[#11161B]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between border-r border-[#1A242B] bg-gradient-to-br from-teal-500/10 via-[#0B0F12] to-cyan-500/10 p-12 lg:flex">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-teal-300">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                Admin Access
              </div>
              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white leading-tight font-display">
                Manage your portfolio without touching source files.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                Sign in to create, update, and publish projects, skills, certificates, achievements, resume links, and profile content directly from the dashboard.
              </p>
            </div>
            <p className="text-xs tracking-wider text-slate-500 uppercase">Node.js • Express • MongoDB • JWT • React</p>
          </div>

          <div className="p-8 sm:p-12 bg-[#11161B] flex items-center">
            <div className="w-full max-w-md mx-auto">
              <p className="text-xs uppercase tracking-[0.24em] text-teal-400 font-semibold">Portfolio Admin</p>
              <h2 className="mt-4 text-3xl font-semibold text-white font-display">Sign In</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Use the admin credentials configured in your environment to unlock the dashboard.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="admin-email">Email Address</label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="admin-password">Password</label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-[#1A242B] bg-[#161F25] px-4 py-3.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {error ? (
                  <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4 text-sm font-bold text-slate-950 transition duration-300 hover:from-teal-400 hover:to-cyan-400 shadow-[0_4px_20px_rgba(45,212,191,0.25)] hover:shadow-[0_4px_35px_rgba(45,212,191,0.4)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
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
