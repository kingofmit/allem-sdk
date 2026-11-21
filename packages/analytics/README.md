<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/analytics"><img src="https://img.shields.io/npm/v/@allem-sdk/analytics.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

# @allem-sdk/analytics

Provider-agnostic analytics hooks for React. Bring your own analytics provider (Mixpanel, Segment, PostHog, etc.) via a simple adapter interface. Supports multiple adapters simultaneously.

## Installation

```bash
npm install @allem-sdk/analytics
```

## Usage

```tsx
import { AnalyticsProvider, useTrack, usePageView, useIdentify } from "@allem-sdk/analytics";

// Define adapters for your providers (use one or many)
const mixpanelAdapter = {
  track: (event, properties) => mixpanel.track(event, properties),
  page: (name, properties) => mixpanel.track_pageview({ page: name, ...properties }),
  identify: (userId, traits) => mixpanel.identify(userId),
};

const posthogAdapter = {
  track: (event, properties) => posthog.capture(event, properties),
  page: (name, properties) => posthog.capture("$pageview", { page: name, ...properties }),
  identify: (userId, traits) => posthog.identify(userId, traits),
};

function App() {
  return (
    <AnalyticsProvider adapters={[mixpanelAdapter, posthogAdapter]}>
      <MyApp />
    </AnalyticsProvider>
  );
}

function ProductPage({ product }) {
  const track = useTrack();
  usePageView("Product Page", { productId: product.id });

  return (
    <button onClick={() => track("Add to Cart", { productId: product.id })}>
      Add to Cart
    </button>
  );
}
```

## Built-in Adapters

Pre-built adapters for popular analytics providers:

```tsx
import { mixpanelAdapter, posthogAdapter, segmentAdapter, consoleAdapter } from "@allem-sdk/analytics";
```

| Adapter | Usage | Description |
|---------|-------|-------------|
| `mixpanelAdapter(mixpanel)` | Pass your initialized Mixpanel instance | Tracks events, page views, and identifies users with `people.set` |
| `posthogAdapter(posthog)` | Pass your initialized PostHog instance | Uses `capture` for events and `$pageview` for pages |
| `segmentAdapter(analytics)` | Pass `window.analytics` or Analytics.js instance | Direct mapping to Segment's `track`, `page`, `identify` |
| `consoleAdapter(prefix?)` | No dependencies | Logs all events to console. Great for development. |

```tsx
import mixpanel from "mixpanel-browser";
import posthog from "posthog-js";

mixpanel.init("YOUR_TOKEN");
posthog.init("YOUR_KEY", { api_host: "https://app.posthog.com" });

// Use one or many adapters simultaneously
<AnalyticsProvider adapters={[mixpanelAdapter(mixpanel), posthogAdapter(posthog), consoleAdapter()]}>
  <App />
</AnalyticsProvider>
```

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `AnalyticsProvider` | Component | Context provider accepting one or multiple adapters |
| `useTrack` | Hook | Returns a `track(event, properties)` function |
| `usePageView` | Hook | Tracks a page view on mount |
| `useIdentify` | Hook | Returns an `identify(userId, traits)` function |
| `mixpanelAdapter` | Factory | Adapter for Mixpanel |
| `posthogAdapter` | Factory | Adapter for PostHog |
| `segmentAdapter` | Factory | Adapter for Segment / Analytics.js |
| `consoleAdapter` | Factory | Console-logging adapter for development |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
