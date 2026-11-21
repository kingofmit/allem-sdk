<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/hooks"><img src="https://img.shields.io/npm/v/@allem-sdk/hooks.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SSR-safe-brightgreen" alt="SSR Safe" />
</p>

# @allem-sdk/hooks

Essential React hooks for modern applications. SSR-safe, zero dependencies, works with Next.js, Vite, and Remix.

## Installation

```bash
npm install @allem-sdk/hooks
```

## Hooks

| Hook | Description |
|------|-------------|
| `useDebounce` | Debounce a value by a given delay |
| `useThrottle` | Throttle a value, updating at most once per delay |
| `useLocalStorage` | Persist state in localStorage with SSR safety |
| `useMediaQuery` | Reactive CSS media query matching |
| `useClickOutside` | Detect clicks outside a ref element |
| `useToggle` | Boolean toggle state |
| `useCopyToClipboard` | Copy text to clipboard with status |
| `useIntersectionObserver` | Observe element visibility via IntersectionObserver |
| `useWindowSize` | Reactive window dimensions |
| `useFetch` | Data fetching with loading/error states and refetch |
| `usePrevious` | Track the previous value of a variable |
| `useKeyPress` | Detect if a specific key is pressed |
| `useOnlineStatus` | Reactive browser online/offline status |

## Usage

```tsx
import { useDebounce, useLocalStorage, useMediaQuery } from "@allem-sdk/hooks";

function Search() {
  const [query, setQuery] = useLocalStorage("search", "");
  const debouncedQuery = useDebounce(query, 300);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

```tsx
import { useClickOutside, useToggle } from "@allem-sdk/hooks";

function Dropdown() {
  const [isOpen, toggle] = useToggle(false);
  const ref = useClickOutside<HTMLDivElement>(() => toggle(false));

  return (
    <div ref={ref}>
      <button onClick={() => toggle()}>Menu</button>
      {isOpen && <ul>...</ul>}
    </div>
  );
}
```

## More Examples

```tsx
import { useFetch, useThrottle, useKeyPress, useOnlineStatus, usePrevious } from "@allem-sdk/hooks";

function UserList() {
  const { data, error, isLoading, refetch } = useFetch<User[]>("/api/users");
  const isOnline = useOnlineStatus();
  const isEscPressed = useKeyPress("Escape");

  if (!isOnline) return <p>You are offline</p>;
  if (isLoading) return <p>Loading...</p>;
  return <ul>{data?.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}

function ScrollTracker() {
  const [scroll, setScroll] = useState(0);
  const throttledScroll = useThrottle(scroll, 100);
  const prevScroll = usePrevious(throttledScroll);
  const direction = prevScroll !== undefined && throttledScroll > prevScroll ? "down" : "up";

  useEffect(() => {
    const handler = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return <p>Scrolling {direction}</p>;
}
```

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
