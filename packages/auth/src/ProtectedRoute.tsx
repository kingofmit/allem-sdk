import { type ReactNode } from "react";
import { useAuthContext } from "./AuthProvider";

export interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  fallback = null,
  loadingFallback = null,
}: ProtectedRouteProps) {
  const { status } = useAuthContext();

  if (status === "loading") return <>{loadingFallback}</>;
  if (status === "unauthenticated") return <>{fallback}</>;
  return <>{children}</>;
}
