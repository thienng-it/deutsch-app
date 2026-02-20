import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../api/auth';

export default function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [displayName, setDisplayName]   = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [canRegister, setCanRegister]   = useState(true);

  useEffect(() => {
    authApi.canRegister().then(data => setCanRegister(data.canRegister)).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password, displayName);
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      {/* German flag decoration */}
      <div className="absolute top-0 left-0 right-0 h-2 flag-stripe" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🇩🇪</div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Deutsch<span className="text-red-500">App</span>
          </h1>
          <p className="text-gray-400">Your personal German learning companion</p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                mode === 'login'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            {canRegister && (
              <button
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  mode === 'register'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                Register
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Display Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Joseph"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={30}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
              <input
                type="text"
                className="input"
                placeholder="your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {error && (
              <div className="bg-red-950/60 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-lg animate-shake">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
              {loading
                ? <span className="animate-spin">⏳</span>
                : mode === 'login' ? 'Sign In →' : 'Create Account →'
              }
            </button>
          </form>

          {!canRegister && mode === 'login' && (
            <p className="text-xs text-gray-600 text-center mt-4">
              🔒 Private app — registration is closed
            </p>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Private & local • Max 2 users • 🔐 Secure
        </p>
      </div>
    </div>
  );
}
