import { createContext, useContext, useCallback, useRef, type ReactNode } from "react";

export interface AnalyticsAdapter {
  track: (event: string, properties?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}

interface AnalyticsContextValue {
  adapters: AnalyticsAdapter[];
}

const AnalyticsContext = createContext<AnalyticsContextValue>({ adapters: [] });

export interface AnalyticsProviderProps {
  adapters: AnalyticsAdapter[];
  children: ReactNode;
}

export function AnalyticsProvider({ adapters, children }: AnalyticsProviderProps) {
  const value = useRef({ adapters }).current;
  return (
    <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
  );
}

export function useAnalyticsAdapters(): AnalyticsAdapter[] {
  return useContext(AnalyticsContext).adapters;
}
