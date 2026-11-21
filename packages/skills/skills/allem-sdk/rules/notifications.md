# Notifications

```tsx
import { NotificationProvider, useNotify, useNotifications } from "@allem-sdk/notifications";
```

## NotificationProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxCount` | `number` | `5` | Maximum notifications visible at once. Oldest are evicted. |

```tsx
<NotificationProvider maxCount={5}>
  <App />
  <ToastContainer />
</NotificationProvider>
```

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
| `message` | `string` | — | Optional description |
| `duration` | `number` | `5000` | Auto-dismiss in ms. Set to `0` to persist. |

```tsx
const { notify, dismiss, dismissAll } = useNotify();

// Basic
notify({ title: "Saved!" });

// With type
notify({ type: "success", title: "File uploaded" });

// With message
notify({ type: "error", title: "Upload failed", message: "File too large (max 5MB)" });

// Persistent (no auto-dismiss)
const id = notify({ title: "Uploading...", type: "info", duration: 0 });
// Later:
dismiss(id);

// Clear all
dismissAll();
```

## useNotifications

Returns the current `Notification[]` array for rendering.

### Notification object

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `type` | `"info" \| "success" \| "warning" \| "error"` | Notification type |
| `title` | `string` | Title text |
| `message` | `string \| undefined` | Optional description |
| `duration` | `number` | Auto-dismiss duration in ms |
| `createdAt` | `number` | Timestamp (ms since epoch) |

```tsx
const notifications = useNotifications();

// Render your own toast UI
<div style={{ position: "fixed", top: 16, right: 16 }}>
  {notifications.map((n) => (
    <div key={n.id} className={`toast toast-${n.type}`}>
      <strong>{n.title}</strong>
      {n.message && <p>{n.message}</p>}
    </div>
  ))}
</div>
```

## Best practices

- This is a headless notification system — you provide the rendering
- Use `type` to style toasts differently (success = green, error = red, etc.)
- Set `duration: 0` for important notifications that require user acknowledgement
- Use `maxCount` to prevent toast overflow on rapid events
- `useNotify` and `useNotifications` must be used within `<NotificationProvider>`
- Both hooks access the same context — use `useNotify` for actions, `useNotifications` for reading
