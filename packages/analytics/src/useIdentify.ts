import { useCallback } from "react";
import { useAnalyticsAdapters } from "./AnalyticsProvider";

export function useIdentify() {
  const adapters = useAnalyticsAdapters();

  const identify = useCallback(
    (userId: string, traits?: Record<string, unknown>) => {
      for (const adapter of adapters) {
        adapter.identify(userId, traits);
      }
    },
    [adapters],
  );

  return identify;
}
