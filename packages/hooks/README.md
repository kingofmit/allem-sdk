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
| `useLocalStorage` | Persist state in localStorage with SSR safety |
| `useMediaQuery` | Reactive CSS media query matching |
| `useClickOutside` | Detect clicks outside a ref element |
| `useToggle` | Boolean toggle state |
| `useCopyToClipboard` | Copy text to clipboard with status |
| `useIntersectionObserver` | Observe element visibility via IntersectionObserver |
| `useWindowSize` | Reactive window dimensions |

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

## License

[MIT](../../LICENSE)
