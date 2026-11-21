<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/realtime"><img src="https://img.shields.io/npm/v/@allem-sdk/realtime.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

# @allem-sdk/realtime

WebSocket and SSE abstraction for React. Subscribe to channels, track presence, and monitor connection status with a provider-agnostic adapter interface.

## Installation

```bash
npm install @allem-sdk/realtime
```

## Usage

```tsx
import { RealtimeProvider, useChannel, usePresence, useConnectionStatus } from "@allem-sdk/realtime";

function App() {
  return (
    <RealtimeProvider adapter={myRealtimeAdapter}>
      <ChatRoom />
    </RealtimeProvider>
  );
}

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const status = useConnectionStatus();
  const members = usePresence("room-1", { name: "Ahmed" });

  const { publish } = useChannel("room-1", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  return (
    <div>
      <p>Status: {status}</p>
      <p>{members.length} online</p>
      {messages.map((m, i) => <div key={i}>{m.text}</div>)}
      <button onClick={() => publish({ text: "Hello!" })}>Send</button>
    </div>
  );
}
```

## RealtimeAdapter Interface

Implement this interface for your WebSocket/SSE provider:

```tsx
import type { RealtimeAdapter } from "@allem-sdk/realtime";

const myRealtimeAdapter: RealtimeAdapter = {
  // Required
  subscribe: (channel, callback) => {
    const ws = new WebSocket(`wss://example.com/${channel}`);
    ws.onmessage = (e) => callback(JSON.parse(e.data));
    return () => ws.close();
  },
  publish: (channel, data) => { /* send to server */ },
  getStatus: () => "connected",

  // Optional — for presence support
  subscribePresence: (channel, callback) => { /* ... */ return () => {}; },
  enterPresence: (channel, info) => { /* ... */ },
  leavePresence: (channel) => { /* ... */ },
  disconnect: () => { /* ... */ },
};
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

Returns `{ publish }` — sends data to the same channel. Automatically unsubscribes on unmount.

## usePresence

Track who is present on a channel. Joins on mount, leaves on unmount.

```tsx
const members = usePresence(channel: string, info?: Record<string, unknown>)
```

| Param | Type | Description |
|-------|------|-------------|
| `channel` | `string` | Channel name |
| `info` | `Record<string, unknown>` | Your presence info (name, avatar, etc.) |

Returns `PresenceMember[]`:

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Member identifier |
| `info` | `Record<string, unknown>` | Presence info |
| `joinedAt` | `number` | Join timestamp (ms since epoch) |

Requires `subscribePresence` and `enterPresence` on the adapter. No-ops if not provided.

## useConnectionStatus

Returns the current connection status of the adapter.

```tsx
const status = useConnectionStatus()
// "connecting" | "connected" | "disconnected" | "error"
```

Uses `useSyncExternalStore` with 1-second polling. Returns `"disconnected"` during SSR.

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `RealtimeProvider` | Component | Context provider accepting a realtime adapter |
| `useChannel` | Hook | Subscribe to a channel, returns `{ publish }` |
| `usePresence` | Hook | Track and join presence on a channel |
| `useConnectionStatus` | Hook | Current connection status string |
| `useRealtimeAdapter` | Hook | Access the raw adapter directly |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
