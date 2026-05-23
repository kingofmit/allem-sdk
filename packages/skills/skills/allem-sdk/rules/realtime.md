# Realtime

```tsx
import {
  RealtimeProvider, useChannel, usePresence, useConnectionStatus,
  useRealtimeAdapter,
} from "@allem-sdk/realtime";
```

## RealtimeAdapter interface

Implement this interface for your WebSocket/SSE provider:

```tsx
interface RealtimeAdapter {
  // Required
  subscribe(channel: string, callback: (data: unknown) => void): () => void;
  publish(channel: string, data: unknown): void;
  getStatus(): ConnectionStatus; // "connecting" | "connected" | "disconnected" | "error"

  // Optional — for presence support
  subscribePresence?(channel: string, callback: (members: PresenceMember[]) => void): () => void;
  enterPresence?(channel: string, info: Record<string, unknown>): void;
  leavePresence?(channel: string): void;
  disconnect?(): void;
}

interface PresenceMember {
  id: string;
  info: Record<string, unknown>;
  joinedAt: number;
}
```

## RealtimeProvider

| Prop | Type | Description |
|------|------|-------------|
| `adapter` | `RealtimeAdapter` | Your realtime adapter |

```tsx
<RealtimeProvider adapter={myAdapter}>
  <App />
</RealtimeProvider>
```

## useChannel

Subscribe to a channel and get a `publish` function.

```tsx
const { publish } = useChannel(channel: string, onMessage: (data: unknown) => void)
```

| Param | Type | Description |
|-------|------|-------------|
| `channel` | `string` | Channel name to subscribe to |
| `onMessage` | `(data: unknown) => void` | Callback for incoming messages |

Returns `{ publish }`. Automatically subscribes on mount and unsubscribes on unmount.

```tsx
const [messages, setMessages] = useState([]);

const { publish } = useChannel("chat-room", (data) => {
  setMessages((prev) => [...prev, data]);
});

// Send a message
publish({ text: "Hello!", userId: "123" });
```

## usePresence

Track who is present on a channel. Joins on mount, leaves on unmount.

```tsx
const members = usePresence(channel: string, info?: Record<string, unknown>)
```

| Param | Type | Description |
|-------|------|-------------|
| `channel` | `string` | Channel name |
| `info` | `Record<string, unknown>` | Your presence info (name, avatar, etc.) |

Returns `PresenceMember[]`. Requires `subscribePresence` and `enterPresence` on the adapter. No-ops if not provided.

```tsx
const members = usePresence("room-1", { name: "Ahmed", avatar: "/me.png" });

<ul>
  {members.map((m) => (
    <li key={m.id}>{m.info.name} (joined {new Date(m.joinedAt).toLocaleTimeString()})</li>
  ))}
</ul>
```

## useConnectionStatus

Returns the current connection status.

```tsx
const status = useConnectionStatus()
// "connecting" | "connected" | "disconnected" | "error"
```

Uses `useSyncExternalStore` with 1-second polling. Returns `"disconnected"` during SSR.

```tsx
const status = useConnectionStatus();

{status === "disconnected" && <Banner>Reconnecting...</Banner>}
{status === "error" && <Banner>Connection lost</Banner>}
```

## useRealtimeAdapter

Returns the raw `RealtimeAdapter` from the nearest `RealtimeProvider`. Use for direct adapter access.

## Example: WebSocket adapter

```tsx
function createWebSocketAdapter(url: string): RealtimeAdapter {
  let ws: WebSocket | null = null;
  const listeners = new Map<string, Set<(data: unknown) => void>>();

  function ensureConnection() {
    if (ws && ws.readyState === WebSocket.OPEN) return;
    ws = new WebSocket(url);
    ws.onmessage = (e) => {
      const { channel, data } = JSON.parse(e.data);
      listeners.get(channel)?.forEach((cb) => cb(data));
    };
  }

  return {
    subscribe(channel, callback) {
      ensureConnection();
      if (!listeners.has(channel)) listeners.set(channel, new Set());
      listeners.get(channel)!.add(callback);
      return () => listeners.get(channel)?.delete(callback);
    },
    publish(channel, data) {
      ensureConnection();
      ws?.send(JSON.stringify({ channel, data }));
    },
    getStatus() {
      if (!ws) return "disconnected";
      if (ws.readyState === WebSocket.CONNECTING) return "connecting";
      if (ws.readyState === WebSocket.OPEN) return "connected";
      return "disconnected";
    },
    disconnect() {
      ws?.close();
      ws = null;
    },
  };
}
```

## Best practices

- The adapter pattern works with any realtime provider (Pusher, Ably, Socket.IO, Supabase Realtime, etc.)
- `useChannel` returns a stable `publish` function — safe to include in dependency arrays
- `usePresence` automatically enters and leaves presence — no manual cleanup needed
- Presence methods are optional — adapters without them still work for pub/sub
- `useConnectionStatus` polls every second — use it for status indicators, not high-frequency checks
