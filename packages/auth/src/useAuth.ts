import { useAuthContext, type AuthUser, type AuthStatus } from "./AuthProvider";

export interface UseAuthReturn {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: Record<string, string>) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { user, status, signIn, signOut } = useAuthContext();

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signIn,
    signOut,
  };
}
