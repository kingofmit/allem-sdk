import type { AnalyticsAdapter } from "./AnalyticsProvider";

/**
 * Mixpanel adapter.
 *
 * @example
 * ```tsx
 * import mixpanel from "mixpanel-browser";
 * mixpanel.init("YOUR_TOKEN");
 *
 * <AnalyticsProvider adapters={[mixpanelAdapter(mixpanel)]}>
 * ```
 */
export function mixpanelAdapter(mixpanel: {
  track: (event: string, properties?: Record<string, unknown>) => void;
  identify: (id: string) => void;
  people: { set: (props: Record<string, unknown>) => void };
}): AnalyticsAdapter {
  return {
    track: (event, properties) => mixpanel.track(event, properties),
    page: (name, properties) =>
      mixpanel.track("Page View", { page: name, ...properties }),
    identify: (userId, traits) => {
      mixpanel.identify(userId);
      if (traits) mixpanel.people.set(traits);
    },
  };
}

/**
 * PostHog adapter.
 *
 * @example
 * ```tsx
 * import posthog from "posthog-js";
 * posthog.init("YOUR_KEY", { api_host: "https://app.posthog.com" });
 *
 * <AnalyticsProvider adapters={[posthogAdapter(posthog)]}>
 * ```
 */
export function posthogAdapter(posthog: {
  capture: (event: string, properties?: Record<string, unknown>) => void;
  identify: (id: string, properties?: Record<string, unknown>) => void;
}): AnalyticsAdapter {
  return {
    track: (event, properties) => posthog.capture(event, properties),
    page: (name, properties) =>
      posthog.capture("$pageview", { page: name, ...properties }),
    identify: (userId, traits) => posthog.identify(userId, traits),
  };
}

/**
 * Segment (Analytics.js) adapter.
 *
 * @example
 * ```tsx
 * <AnalyticsProvider adapters={[segmentAdapter(window.analytics)]}>
 * ```
 */
export function segmentAdapter(analytics: {
  track: (event: string, properties?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}): AnalyticsAdapter {
  return {
    track: (event, properties) => analytics.track(event, properties),
    page: (name, properties) => analytics.page(name, properties),
    identify: (userId, traits) => analytics.identify(userId, traits),
  };
}

/**
 * Console adapter for development/debugging. Logs all events to console.
 *
 * @example
 * ```tsx
 * <AnalyticsProvider adapters={[consoleAdapter()]}>
 * ```
 */
export function consoleAdapter(prefix = "[analytics]"): AnalyticsAdapter {
  return {
    track: (event, properties) =>
      console.log(`${prefix} track:`, event, properties),
    page: (name, properties) =>
      console.log(`${prefix} page:`, name, properties),
    identify: (userId, traits) =>
      console.log(`${prefix} identify:`, userId, traits),
  };
}
