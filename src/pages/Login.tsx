import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function PasscodeGate() {
  const { unlock } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const ok = unlock(code.trim());
      setLoading(false);
      if (!ok) {
        setError('Incorrect passcode. Please try again.');
        setCode('');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* German flag top stripe */}
      <div className="absolute top-0 left-0 right-0 h-2 flag-stripe" />

      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🇩🇪</div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Deutsch<span className="text-red-500">App</span>
          </h1>
          <p className="text-gray-400 text-sm">Your personal German learning companion</p>
        </div>

        {/* Card */}
        <div className="card">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔑</span>
            </div>
            <h2 className="text-lg font-semibold text-white">Enter Passcode</h2>
            <p className="text-gray-500 text-xs mt-1">Session valid for 12 hours</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              className={`input text-center text-lg tracking-widest ${shake ? 'animate-shake border-red-600' : ''}`}
              placeholder="••••••••"
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-red-950/60 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading || !code} className="btn-primary w-full py-3">
              {loading ? <span className="animate-spin inline-block">⏳</span> : 'Unlock →'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          🔒 Private app • Access expires every 12 hours
        </p>
      </div>
    </div>
  );
}
