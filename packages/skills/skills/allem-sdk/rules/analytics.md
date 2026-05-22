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

## Best practices

- Create a console-logging adapter for development: `track: (e, p) => console.log("[analytics]", e, p)`
- Adapters are stored in a ref — changing the array doesn't cause re-renders
- Use `usePageView` at the top of page components for automatic page tracking
- Keep event names consistent across your app (e.g. `"Sign Up"`, `"Add to Cart"`, `"Purchase"`)
