# @allem-sdk/analytics

Provider-agnostic analytics hooks for React. Bring your own analytics provider (Mixpanel, Segment, PostHog, etc.) via a simple adapter interface.

## Installation

```bash
npm install @allem-sdk/analytics
```

## Usage

```tsx
import { AnalyticsProvider, useTrack, usePageView, useIdentify } from "@allem-sdk/analytics";

// Define an adapter for your provider
const mixpanelAdapter = {
  track: (event, properties) => mixpanel.track(event, properties),
  page: (name, properties) => mixpanel.track_pageview({ page: name, ...properties }),
  identify: (userId, traits) => mixpanel.identify(userId),
};

function App() {
  return (
    <AnalyticsProvider adapters={[mixpanelAdapter]}>
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

- `AnalyticsProvider` — Context provider accepting multiple adapters
- `useTrack` — Returns a `track(event, properties)` function
- `usePageView` — Tracks a page view on mount
- `useIdentify` — Returns an `identify(userId, traits)` function

## License

[MIT](../../LICENSE)
