import { useAuthContext, type AuthSession } from "./AuthProvider";

export interface UseSessionReturn {
  session: AuthSession | null;
  update: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const { session, refresh } = useAuthContext();
  return { session, update: refresh };
}
