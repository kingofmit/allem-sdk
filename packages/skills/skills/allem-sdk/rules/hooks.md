# Hooks

```tsx
import { useDebounce, useLocalStorage, useMediaQuery, useClickOutside, useToggle, useCopyToClipboard, useIntersectionObserver, useWindowSize } from "@allem-sdk/hooks";
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

## Best practices

- All hooks are SSR-safe — no need for `typeof window` checks in your code
- `useDebounce` is ideal for search inputs and API calls
- `useLocalStorage` serializes values as JSON — works with objects and arrays
- Prefer `useClickOutside` over manual document event listeners for dropdowns/modals
- `useToggle` replaces the common `const [x, setX] = useState(false)` + toggle pattern
