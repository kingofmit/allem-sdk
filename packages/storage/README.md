<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/storage"><img src="https://img.shields.io/npm/v/@allem-sdk/storage.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

# @allem-sdk/storage

Provider-agnostic key-value storage for React. Swap between localStorage, sessionStorage, cookies, or in-memory storage with a single adapter change. SSR-safe.

## Installation

```bash
npm install @allem-sdk/storage
```

## Usage

```tsx
import { StorageProvider, useStorageItem, localStorageAdapter } from "@allem-sdk/storage";

function App() {
  return (
    <StorageProvider adapter={localStorageAdapter()}>
      <Settings />
    </StorageProvider>
  );
}

function Settings() {
  const [theme, setTheme, removeTheme] = useStorageItem("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  );
}
```

## Built-in Adapters

| Adapter | Factory | Description |
|---------|---------|-------------|
| localStorage | `localStorageAdapter()` | Persists across tabs and sessions. SSR-safe. |
| sessionStorage | `sessionStorageAdapter()` | Persists for the current tab only. SSR-safe. |
| Cookies | `cookieAdapter(options?)` | Persists as cookies. Configurable path, maxAge, secure, sameSite. SSR-safe. |
| In-memory | `memoryAdapter()` | Map-based, no persistence. Useful for tests and SSR. |

### Cookie adapter options

```tsx
import { cookieAdapter } from "@allem-sdk/storage";

const adapter = cookieAdapter({
  path: "/",          // default: "/"
  maxAge: 86400,      // seconds
  secure: true,
  sameSite: "lax",    // "strict" | "lax" | "none"
});
```

## Custom Adapters

Implement the `StorageAdapter` interface to use any storage backend:

```tsx
import type { StorageAdapter } from "@allem-sdk/storage";

const redisAdapter: StorageAdapter = {
  getItem: (key) => /* fetch from Redis */,
  setItem: (key, value) => /* write to Redis */,
  removeItem: (key) => /* delete from Redis */,
};
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

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `StorageProvider` | Component | Context provider accepting a storage adapter |
| `useStorageItem` | Hook | Read/write a single key with JSON serialization |
| `useStorageAdapter` | Hook | Access the raw adapter directly |
| `localStorageAdapter` | Factory | Creates a localStorage adapter |
| `sessionStorageAdapter` | Factory | Creates a sessionStorage adapter |
| `cookieAdapter` | Factory | Creates a cookie adapter with options |
| `memoryAdapter` | Factory | Creates an in-memory Map adapter |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
