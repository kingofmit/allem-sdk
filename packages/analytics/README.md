<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-18+-61dafb" alt="React 18+" />
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

// Define adapters for your providers — use one or many
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

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `AnalyticsProvider` | Component | Context provider accepting one or multiple adapters |
| `useTrack` | Hook | Returns a `track(event, properties)` function |
| `usePageView` | Hook | Tracks a page view on mount |
| `useIdentify` | Hook | Returns an `identify(userId, traits)` function |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
