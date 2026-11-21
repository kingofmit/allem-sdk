<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/notifications"><img src="https://img.shields.io/npm/v/@allem-sdk/notifications.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

# @allem-sdk/notifications

Headless toast and notification system for React. No UI opinions — you control the rendering. Supports auto-dismiss, max count, and notification types.

## Installation

```bash
npm install @allem-sdk/notifications
```

## Usage

```tsx
import { NotificationProvider, useNotify, useNotifications } from "@allem-sdk/notifications";

function App() {
  return (
    <NotificationProvider maxCount={5}>
      <MyApp />
      <ToastContainer />
    </NotificationProvider>
  );
}

function ActionButton() {
  const { notify } = useNotify();

  return (
    <button onClick={() => notify({ title: "Saved!", type: "success" })}>
      Save
    </button>
  );
}

function ToastContainer() {
  const notifications = useNotifications();

  return (
    <div style={{ position: "fixed", top: 16, right: 16 }}>
      {notifications.map((n) => (
        <div key={n.id} style={{ padding: 12, marginBottom: 8, background: "#333", color: "#fff", borderRadius: 8 }}>
          <strong>{n.title}</strong>
          {n.message && <p>{n.message}</p>}
        </div>
      ))}
    </div>
  );
}
```

## NotificationProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxCount` | `number` | `5` | Maximum notifications visible at once. Oldest are evicted when exceeded. |

## useNotify

Returns actions for creating and dismissing notifications.

| Property | Type | Description |
|----------|------|-------------|
| `notify` | `(options: NotifyOptions) => string` | Create a notification, returns its ID |
| `dismiss` | `(id: string) => void` | Dismiss a specific notification |
| `dismissAll` | `() => void` | Dismiss all notifications |

### NotifyOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | — | Notification title (required) |
| `type` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Notification type |
| `message` | `string` | — | Optional description text |
| `duration` | `number` | `5000` | Auto-dismiss in ms. Set to `0` to persist. |

```tsx
const { notify, dismiss } = useNotify();

// Basic
notify({ title: "Changes saved" });

// With type and message
notify({ type: "error", title: "Upload failed", message: "File too large" });

// Persistent (no auto-dismiss)
const id = notify({ title: "Uploading...", type: "info", duration: 0 });
// Later: dismiss(id);
```

## useNotifications

Returns the current `Notification[]` array for rendering.

```tsx
const notifications = useNotifications();
```

### Notification object

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `type` | `"info" \| "success" \| "warning" \| "error"` | Notification type |
| `title` | `string` | Title text |
| `message` | `string \| undefined` | Optional description |
| `duration` | `number` | Auto-dismiss duration in ms |
| `createdAt` | `number` | Timestamp (ms since epoch) |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `NotificationProvider` | Component | Context provider with `maxCount` config |
| `useNotify` | Hook | Returns `{ notify, dismiss, dismissAll }` |
| `useNotifications` | Hook | Returns current `Notification[]` array |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
