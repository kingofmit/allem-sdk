"use client";

import { AuthProvider } from "@allem-sdk/auth";
import { AnalyticsProvider } from "@allem-sdk/analytics";
import { AllemAIProvider } from "@allem-sdk/ai";
import { mockAuthAdapter } from "@/lib/auth-adapter";
import { consoleAnalyticsAdapter } from "@/lib/analytics-adapter";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider adapter={mockAuthAdapter}>
      <AnalyticsProvider adapters={[consoleAnalyticsAdapter]}>
        <AllemAIProvider api="/api/chat" provider="google">
          {children}
        </AllemAIProvider>
      </AnalyticsProvider>
    </AuthProvider>
  );
}
