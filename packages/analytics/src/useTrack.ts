import { useCallback } from "react";
import { useAnalyticsAdapters } from "./AnalyticsProvider";

export function useTrack() {
  const adapters = useAnalyticsAdapters();

  const track = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      for (const adapter of adapters) {
        adapter.track(event, properties);
      }
    },
    [adapters],
  );

  return track;
}
