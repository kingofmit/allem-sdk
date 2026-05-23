# Hooks

```tsx
import {
  useDebounce, useThrottle, useLocalStorage, useMediaQuery,
  useClickOutside, useToggle, useCopyToClipboard, useIntersectionObserver,
  useWindowSize, useFetch, usePrevious, useKeyPress, useOnlineStatus,
} from "@allem-sdk/hooks";
```

## useDebounce

```tsx
const debouncedValue = useDebounce<T>(value: T, delay?: number): T
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `T` | — | Value to debounce |
| `delay` | `number` | `300` | Delay in milliseconds |

Returns the debounced value.

```tsx
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 500);

useEffect(() => {
  if (debouncedQuery) fetchResults(debouncedQuery);
}, [debouncedQuery]);
```

## useLocalStorage

```tsx
const [value, setValue, removeValue] = useLocalStorage<T>(key: string, initialValue: T)
```

| Param | Type | Description |
|-------|------|-------------|
| `key` | `string` | localStorage key |
| `initialValue` | `T` | Fallback when key doesn't exist or SSR |

Returns `[storedValue, setValue, removeValue]`. `setValue` accepts a value or updater function `(prev) => next`. SSR-safe — returns `initialValue` on the server.

```tsx
const [theme, setTheme] = useLocalStorage("theme", "light");
const [count, setCount, resetCount] = useLocalStorage("count", 0);
setCount((prev) => prev + 1);
```

## useMediaQuery

```tsx
const matches = useMediaQuery(query: string): boolean
```

Returns `true` when the CSS media query matches. Updates reactively. SSR-safe — returns `false` on the server.

```tsx
const isMobile = useMediaQuery("(max-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
```

## useClickOutside

```tsx
useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: (event: MouseEvent | TouchEvent) => void): void
```

Calls `handler` when a click or touch occurs outside the element referenced by `ref`. Handles both `mousedown` and `touchstart`.

```tsx
const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, () => setIsOpen(false));

return <div ref={ref}>...</div>;
```

## useToggle

```tsx
const [value, toggle, setValue] = useToggle(initialValue?: boolean)
```

| Param | Type | Default |
|-------|------|---------|
| `initialValue` | `boolean` | `false` |

Returns `[value, toggle, setValue]`. `toggle()` flips the boolean, `setValue(true/false)` sets it directly.

```tsx
const [isOpen, toggle, setOpen] = useToggle(false);
<button onClick={toggle}>Toggle</button>
<button onClick={() => setOpen(false)}>Close</button>
```

## useCopyToClipboard

```tsx
const [copied, copy] = useCopyToClipboard(): [boolean, (text: string) => Promise<void>]
```

Returns `[copied, copy]`. `copied` is `true` for 2 seconds after a successful copy. SSR-safe.

```tsx
const [copied, copy] = useCopyToClipboard();
<button onClick={() => copy("npm install allem-sdk")}>
  {copied ? "Copied!" : "Copy"}
</button>
```

## useIntersectionObserver

```tsx
const isIntersecting = useIntersectionObserver<T extends HTMLElement>(ref: RefObject<T | null>, options?: Options): boolean
```

| Option | Type | Default |
|--------|------|---------|
| `threshold` | `number \| number[]` | `0` |
| `root` | `Element \| null` | `null` |
| `rootMargin` | `string` | `"0px"` |

Returns `true` when the element is visible in the viewport.

```tsx
const ref = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });
```

## useWindowSize

```tsx
const { width, height } = useWindowSize(): { width: number; height: number }
```

Returns the current window dimensions. Updates on resize. Returns `{ width: 0, height: 0 }` on the server.

```tsx
const { width, height } = useWindowSize();
const isDesktop = width >= 1024;
```

## useFetch

```tsx
const { data, error, isLoading, refetch } = useFetch<T>(url: string | null, options?: RequestInit)
```

| Param | Type | Description |
|-------|------|-------------|
| `url` | `string \| null` | URL to fetch. Pass `null` to skip. |
| `options` | `RequestInit` | Optional fetch options (method, headers, body, etc.) |

Returns `{ data, error, isLoading, refetch }`. Fetches on mount and when `url` changes. Throws on non-OK responses. `refetch()` re-runs the request.

```tsx
const { data, error, isLoading, refetch } = useFetch<User[]>("/api/users");

if (isLoading) return <Spinner />;
if (error) return <p>Error: {error.message}</p>;
return <ul>{data?.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
```

## useThrottle

```tsx
const throttledValue = useThrottle<T>(value: T, delay: number): T
```

| Param | Type | Description |
|-------|------|-------------|
| `value` | `T` | Value to throttle |
| `delay` | `number` | Minimum interval in ms between updates |

Returns the throttled value. Unlike `useDebounce` (which waits for silence), `useThrottle` updates at most once per `delay`.

```tsx
const [scroll, setScroll] = useState(0);
const throttledScroll = useThrottle(scroll, 100);
// Updates at most every 100ms, even during rapid scrolling
```

## usePrevious

```tsx
const previousValue = usePrevious<T>(value: T): T | undefined
```

Returns the previous value of a variable. `undefined` on the first render.

```tsx
const prevCount = usePrevious(count);
const direction = prevCount !== undefined && count > prevCount ? "up" : "down";
```

## useKeyPress

```tsx
const isPressed = useKeyPress(targetKey: string): boolean
```

Returns `true` while the specified key is pressed. SSR-safe. Uses `KeyboardEvent.key` values.

```tsx
const isEscPressed = useKeyPress("Escape");
const isEnterPressed = useKeyPress("Enter");

useEffect(() => {
  if (isEscPressed) closeModal();
}, [isEscPressed]);
```

## useOnlineStatus

```tsx
const isOnline = useOnlineStatus(): boolean
```

Returns the browser's online/offline status. Updates reactively via `online`/`offline` events. Uses `useSyncExternalStore` for safe concurrent rendering. Returns `true` during SSR.

```tsx
const isOnline = useOnlineStatus();

if (!isOnline) return <Banner>You are offline</Banner>;
```

## Best practices

- All hooks are SSR-safe — no need for `typeof window` checks in your code
- `useDebounce` is ideal for search inputs and API calls
- `useThrottle` is ideal for scroll/resize handlers where you want periodic updates
- `useLocalStorage` serializes values as JSON — works with objects and arrays
- Prefer `useClickOutside` over manual document event listeners for dropdowns/modals
- `useToggle` replaces the common `const [x, setX] = useState(false)` + toggle pattern
- `useFetch` returns `null` data initially — always check before rendering
- Pass `null` as the URL to `useFetch` to conditionally skip fetching
