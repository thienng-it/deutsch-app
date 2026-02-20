import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Passcode config ────────────────────────────────────────────────────
// Change this to your desired passcode. It lives only in the browser.
const PASSCODE = 'deutsch2024';
const SESSION_KEY = 'deutsch_session_ts';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function isSessionValid(): boolean {
  const ts = localStorage.getItem(SESSION_KEY);
  if (!ts) return false;
  return Date.now() - parseInt(ts, 10) < SESSION_TTL_MS;
}

// ── Fake user so existing pages don't break ────────────────────────────
const STATIC_USER = {
  id: 1,
  username: 'student',
  displayName: 'Joseph',
  currentLevel: 'A1',
};

interface AuthContextType {
  user: typeof STATIC_USER | null;
  token: string | null;
  loading: boolean;
  unlock: (code: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<typeof STATIC_USER>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthed(isSessionValid());
    setLoading(false);

    // Auto-expire: check every minute
    const interval = setInterval(() => {
      if (!isSessionValid()) setAuthed(false);
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const unlock = useCallback((code: string): boolean => {
    if (code === PASSCODE) {
      localStorage.setItem(SESSION_KEY, Date.now().toString());
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  const updateUser = useCallback((_data: Partial<typeof STATIC_USER>) => {
    // no-op for static user; extend if you want persistence
  }, []);

  return (
    <AuthContext.Provider value={{
      user: authed ? STATIC_USER : null,
      token: authed ? 'local' : null,
      loading,
      unlock,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
