# Storage

```tsx
import {
  StorageProvider, useStorageItem, useStorageAdapter,
  localStorageAdapter, sessionStorageAdapter, cookieAdapter, memoryAdapter,
} from "@allem-sdk/storage";
```

## StorageAdapter interface

Implement this interface for your storage backend:

```tsx
interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
```

## StorageProvider

| Prop | Type | Description |
|------|------|-------------|
| `adapter` | `StorageAdapter` | Storage adapter to use |

```tsx
import { StorageProvider, localStorageAdapter } from "@allem-sdk/storage";

<StorageProvider adapter={localStorageAdapter()}>
  <App />
</StorageProvider>
```

## useStorageItem

```tsx
const [value, setValue, removeValue] = useStorageItem<T>(key: string, initialValue: T)
```

| Param | Type | Description |
|-------|------|-------------|
| `key` | `string` | Storage key |
| `initialValue` | `T` | Fallback when key doesn't exist |

Returns `[storedValue, setValue, removeValue]`. Values are JSON-serialized automatically. `setValue` accepts a value or updater function `(prev) => next`.

```tsx
const [theme, setTheme, removeTheme] = useStorageItem("theme", "light");

setTheme("dark");
setTheme((prev) => prev === "dark" ? "light" : "dark"); // updater
removeTheme(); // resets to "light"
```

## useStorageAdapter

Returns the raw `StorageAdapter` from the nearest `StorageProvider`. Use for direct access when you don't need JSON serialization.

## Built-in adapters

| Adapter | Factory | Description |
|---------|---------|-------------|
| localStorage | `localStorageAdapter()` | Persists across tabs and sessions. SSR-safe. |
| sessionStorage | `sessionStorageAdapter()` | Persists for the current tab only. SSR-safe. |
| Cookies | `cookieAdapter(options?)` | Cookie-based. Configurable path, maxAge, secure, sameSite. SSR-safe. |
| In-memory | `memoryAdapter()` | Map-based, no persistence. Useful for tests and SSR. |

### Cookie adapter options

```tsx
const adapter = cookieAdapter({
  path: "/",          // default: "/"
  maxAge: 86400,      // seconds
  secure: true,
  sameSite: "lax",    // "strict" | "lax" | "none"
});
```

### Custom adapter

```tsx
const redisAdapter: StorageAdapter = {
  getItem: (key) => redis.get(key),
  setItem: (key, value) => redis.set(key, value),
  removeItem: (key) => redis.del(key),
};
```

## Best practices

- Use `localStorageAdapter()` for settings and preferences that persist across sessions
- Use `sessionStorageAdapter()` for temporary data like form drafts
- Use `cookieAdapter()` when you need server-readable values (e.g. theme, locale)
- Use `memoryAdapter()` in tests and SSR to avoid `window` errors
- All built-in adapters return a noop adapter on the server — no SSR crashes
- `useStorageItem` is like `useLocalStorage` from `@allem-sdk/hooks` but adapter-agnostic
