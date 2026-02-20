import React, { createContext, useContext } from 'react';

// ── Static user — no authentication required ────────────────────────────
export const STATIC_USER = {
  id: 1,
  username: 'student',
  displayName: 'Learner',
  currentLevel: 'A1',
};

interface AuthContextType {
  user: typeof STATIC_USER;
  token: string;
  loading: false;
  updateUser: (data: Partial<typeof STATIC_USER>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{
      user: STATIC_USER,
      token: 'local',
      loading: false,
      updateUser: () => { },
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
