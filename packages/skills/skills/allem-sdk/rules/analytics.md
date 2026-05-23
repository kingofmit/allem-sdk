# Analytics

```tsx
import { AnalyticsProvider, useTrack, usePageView, useIdentify } from "@allem-sdk/analytics";
```

## AnalyticsAdapter interface

Implement this interface for your analytics provider:

```tsx
interface AnalyticsAdapter {
  track: (event: string, properties?: Record<string, unknown>) => void;
  page: (name?: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
}
```

Supports multiple adapters simultaneously — all adapters receive every event.

## AnalyticsProvider

| Prop | Type | Description |
|------|------|-------------|
| `adapters` | `AnalyticsAdapter[]` | One or more analytics adapters |

```tsx
const mixpanelAdapter = {
  track: (event, props) => mixpanel.track(event, props),
  page: (name, props) => mixpanel.track_pageview({ page: name, ...props }),
  identify: (userId, traits) => mixpanel.identify(userId),
};

const posthogAdapter = {
  track: (event, props) => posthog.capture(event, props),
  page: (name, props) => posthog.capture("$pageview", { page: name, ...props }),
  identify: (userId, traits) => posthog.identify(userId, traits),
};

<AnalyticsProvider adapters={[mixpanelAdapter, posthogAdapter]}>
  <App />
</AnalyticsProvider>
```

## useTrack

Returns a `track(event, properties?)` function that sends to all adapters.

```tsx
const track = useTrack();

<button onClick={() => track("Add to Cart", { productId: "123", price: 29.99 })}>
  Add to Cart
</button>
```

## usePageView

Tracks a page view on mount. Calls `adapter.page()` for all adapters.

```tsx
usePageView("Product Page", { productId: "123" });
```

| Param | Type | Description |
|-------|------|-------------|
| `name` | `string` | Page name |
| `properties` | `Record<string, unknown>` | Optional properties |

## useIdentify

Returns an `identify(userId, traits?)` function that sends to all adapters.

```tsx
const identify = useIdentify();

// After login
identify(user.id, { email: user.email, plan: "pro" });
```

## Built-in adapters

Pre-built adapter factories — pass your initialized SDK instance:

```tsx
import { mixpanelAdapter, posthogAdapter, segmentAdapter, consoleAdapter } from "@allem-sdk/analytics";
```

| Adapter | Usage | Description |
|---------|-------|-------------|
| `mixpanelAdapter(mixpanel)` | Pass initialized Mixpanel instance | Uses `track`, `identify`, `people.set` |
| `posthogAdapter(posthog)` | Pass initialized PostHog instance | Uses `capture`, `identify` |
| `segmentAdapter(analytics)` | Pass `window.analytics` or Analytics.js | Direct mapping to `track`, `page`, `identify` |
| `consoleAdapter(prefix?)` | No dependencies | Logs all events to console. Default prefix: `"[analytics]"` |

```tsx
import mixpanel from "mixpanel-browser";
import posthog from "posthog-js";

mixpanel.init("YOUR_TOKEN");
posthog.init("YOUR_KEY", { api_host: "https://app.posthog.com" });

<AnalyticsProvider adapters={[mixpanelAdapter(mixpanel), posthogAdapter(posthog), consoleAdapter()]}>
  <App />
</AnalyticsProvider>
```

## Best practices

- Use `consoleAdapter()` in development to see all events in the console
- Adapters are stored in a ref — changing the array doesn't cause re-renders
- Use `usePageView` at the top of page components for automatic page tracking
- Keep event names consistent across your app (e.g. `"Sign Up"`, `"Add to Cart"`, `"Purchase"`)
- All adapters receive every event — use multiple adapters to send to multiple providers simultaneously
