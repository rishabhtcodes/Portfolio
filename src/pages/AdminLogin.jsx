import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, Terminal } from 'lucide-react';
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
    <div className="min-h-screen bg-[#ece6d9] text-[#2b251d] font-mono flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#f5f0e6] border-2 border-[#d4cbb8] rounded-lg shadow-md overflow-hidden">
        {/* Retro Header Bar */}
        <div className="bg-[#794422] text-[#f7f3ec] px-4 py-2 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>SWIFT OS ADMIN AUTH</span>
          </div>
          <span className="text-[10px] bg-[#5c3217] px-1.5 py-0.5 rounded opacity-80">v2.4.0</span>
        </div>

        {/* Login Form Content */}
        <div className="p-6 space-y-5">
          <div className="text-center border-b border-[#d4cbb8] pb-4">
            <h2 className="text-base font-bold text-[#794422] uppercase tracking-wider">Admin System Login</h2>
            <p className="text-xs text-[#6b6255] mt-1">Authenticate to manage portfolio database</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6b6255] mb-1" htmlFor="admin-email">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-2 text-xs text-[#2b251d] placeholder-[#6b6255] outline-none focus:border-[#794422]"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#6b6255] mb-1" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded border border-[#d4cbb8] bg-[#fbf8f1] px-3 py-2 text-xs text-[#2b251d] placeholder-[#6b6255] outline-none focus:border-[#794422]"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="p-2.5 rounded border border-red-700 bg-red-100 text-red-800 text-xs font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded bg-[#794422] hover:bg-[#5c3217] text-[#f7f3ec] font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LockKeyhole className="w-4 h-4" />
              {submitting ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
