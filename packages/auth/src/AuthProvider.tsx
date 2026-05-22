import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  [key: string]: unknown;
}

export interface AuthSession {
  user: AuthUser | null;
  token: string | null;
  expiresAt: number | null;
}

export interface AuthAdapter {
  getSession: () => Promise<AuthSession>;
  signIn: (credentials: Record<string, string>) => Promise<AuthSession>;
  signOut: () => Promise<void>;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  session: AuthSession | null;
  status: AuthStatus;
  signIn: (credentials: Record<string, string>) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  adapter: AuthAdapter;
  children: ReactNode;
}

export function AuthProvider({ adapter, children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refresh = useCallback(async () => {
    try {
      const s = await adapter.getSession();
      setSession(s);
      setStatus(s.user ? "authenticated" : "unauthenticated");
    } catch {
      setSession(null);
      setStatus("unauthenticated");
    }
  }, [adapter]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signIn = useCallback(
    async (credentials: Record<string, string>) => {
      setStatus("loading");
      const s = await adapter.signIn(credentials);
      setSession(s);
      setStatus(s.user ? "authenticated" : "unauthenticated");
    },
    [adapter],
  );

  const signOut = useCallback(async () => {
    await adapter.signOut();
    setSession(null);
    setStatus("unauthenticated");
  }, [adapter]);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    session,
    status,
    signIn,
    signOut,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
