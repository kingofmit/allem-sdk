import Link from "next/link";

const hooks = [
  { name: "useDebounce", description: "Debounce any value with a configurable delay", href: "/docs/hooks/use-debounce" },
  { name: "useLocalStorage", description: "Persist state in localStorage with SSR safety", href: "/docs/hooks/use-local-storage" },
  { name: "useMediaQuery", description: "Track CSS media query matches reactively", href: "/docs/hooks/use-media-query" },
  { name: "useClickOutside", description: "Detect clicks outside a referenced element", href: "/docs/hooks/use-click-outside" },
  { name: "useToggle", description: "Boolean state with toggle, on, and off helpers", href: "/docs/hooks/use-toggle" },
  { name: "useCopyToClipboard", description: "Copy text to clipboard with success state", href: "/docs/hooks/use-copy-to-clipboard" },
  { name: "useIntersectionObserver", description: "Observe element visibility in the viewport", href: "/docs/hooks/use-intersection-observer" },
  { name: "useWindowSize", description: "Track window dimensions reactively", href: "/docs/hooks/use-window-size" },
];

export default function HooksOverviewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Hooks</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        8 essential React hooks for common UI patterns. SSR-safe, TypeScript-first, zero dependencies.
      </p>

      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">npm install @allem-sdk/hooks</code>
      </div>

      <div className="mt-12 grid gap-3">
        {hooks.map((hook) => (
          <Link
            key={hook.name}
            href={hook.href}
            className="flex items-center justify-between rounded-lg border border-neutral-200 px-5 py-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-neutral-800 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30"
          >
            <div>
              <span className="font-mono text-sm font-medium text-indigo-600 dark:text-indigo-400">{hook.name}</span>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{hook.description}</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
