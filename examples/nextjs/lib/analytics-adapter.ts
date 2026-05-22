import type { AnalyticsAdapter } from "@allem-sdk/analytics";

export const consoleAnalyticsAdapter: AnalyticsAdapter = {
  track: (event, properties) => {
    console.log("[Analytics] Track:", event, properties);
  },
  page: (name, properties) => {
    console.log("[Analytics] Page:", name, properties);
  },
  identify: (userId, traits) => {
    console.log("[Analytics] Identify:", userId, traits);
  },
};
