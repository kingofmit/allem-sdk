export default function AnalyticsProviderPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AnalyticsProvider</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Wraps your app with analytics context. Supports multiple adapters — all adapters receive every event.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { AnalyticsProvider } from "@allem-sdk/analytics";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">AnalyticsAdapter interface</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`interface AnalyticsAdapter {
  track: (event: string, properties?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const mixpanelAdapter = {
  track: (event, props) => mixpanel.track(event, props),
  page: (name, props) => mixpanel.track_pageview({ page: name, ...props }),
  identify: (userId) => mixpanel.identify(userId),
};

const posthogAdapter = {
  track: (event, props) => posthog.capture(event, props),
  page: (name, props) => posthog.capture("$pageview", { page: name, ...props }),
  identify: (userId, traits) => posthog.identify(userId, traits),
};

// Dev adapter for logging
const consoleAdapter = {
  track: (e, p) => console.log("[analytics] track", e, p),
  page: (n, p) => console.log("[analytics] page", n, p),
  identify: (id, t) => console.log("[analytics] identify", id, t),
};

<AnalyticsProvider adapters={[mixpanelAdapter, posthogAdapter]}>
  <App />
</AnalyticsProvider>`}</pre>
      </div>
    </div>
  );
}
