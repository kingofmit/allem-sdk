import { useEffect } from "react";
import { useAnalyticsAdapters } from "./AnalyticsProvider";

export function usePageView(name?: string, properties?: Record<string, unknown>) {
  const adapters = useAnalyticsAdapters();

  useEffect(() => {
    for (const adapter of adapters) {
      adapter.page(name, properties);
    }
  }, [adapters, name, properties]);
}
