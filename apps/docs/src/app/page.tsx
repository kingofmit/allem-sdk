import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    title: "AI Chat & Completions",
    description:
      "Multi-provider AI hooks with streaming support. Works with Google, Anthropic, and OpenAI out of the box.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Form Management",
    description:
      "Declarative form hooks with built-in validation, error tracking, and submit handling. Zero dependencies.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Analytics",
    description:
      "Provider-agnostic analytics with multi-adapter support. Track events, page views, and user identity across any provider.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Authentication",
    description:
      "Adapter-based auth with session management, protected routes, and flexible credential handling.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "8 Utility Hooks",
    description:
      "Essential React hooks — debounce, localStorage, media queries, click outside, toggle, clipboard, intersection observer, window size.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "TypeScript & SSR-Safe",
    description:
      "Full type safety with strict mode. Every hook is SSR-safe and works with Next.js, Vite, and Remix.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const packages = [
  { name: "Hooks", href: "/docs/hooks", count: "8 hooks" },
  { name: "AI", href: "/docs/ai", count: "4 exports" },
  { name: "Forms", href: "/docs/forms", count: "3 exports" },
  { name: "Analytics", href: "/docs/analytics", count: "4 exports" },
  { name: "Auth", href: "/docs/auth", count: "4 exports" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/80 backdrop-blur-lg dark:border-neutral-800/50 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Allem SDK
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/docs/getting-started"
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                Docs
              </Link>
              <Link
                href="/docs/hooks"
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                API
              </Link>
              <a
                href="https://github.com/kingofmit/allem-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <code className="hidden rounded-lg bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 sm:block">
              npm i allem-sdk
            </code>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(99,102,241,0.08),transparent)]" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:py-40">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">
            v0.1.1 — Now available on npm
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            The React SDK for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              modern apps
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            AI hooks, form management, analytics, authentication, and utility
            hooks — everything you need to build production React applications.
            Open source and framework-agnostic.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/getting-started"
              className="inline-flex h-11 items-center rounded-lg bg-indigo-600 px-6 text-sm font-medium text-white shadow-sm shadow-indigo-600/25 transition-all duration-200 hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/30 active:scale-[0.97]"
            >
              Get Started
            </Link>
            <Link
              href="/docs/hooks"
              className="inline-flex h-11 items-center rounded-lg border border-neutral-200 bg-white px-6 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 active:scale-[0.97] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Browse API
            </Link>
          </div>

          {/* Install command */}
          <div className="mx-auto mt-12 max-w-md">
            <div className="flex items-center rounded-xl bg-neutral-900 px-5 py-3.5 ring-1 ring-white/10 shadow-lg">
              <span className="mr-3 text-emerald-400">$</span>
              <code className="flex-1 text-left text-sm text-neutral-100">
                npm install allem-sdk
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Five packages, one SDK. Install what you need or get everything
              with a single import.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="mb-4 inline-flex rounded-lg bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              5 packages, one SDK
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Use individual packages or install everything with{" "}
              <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">
                allem-sdk
              </code>
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Link
                key={pkg.name}
                href={pkg.href}
                className="flex items-center justify-between rounded-lg border border-neutral-200 px-5 py-4 text-sm font-medium transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-neutral-800 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-600/50" />
                  {pkg.name}
                </div>
                <span className="text-xs text-neutral-500">{pkg.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Allem SDK by{" "}
            <a
              href="https://kingallem.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-white"
            >
              Ahmed Allem
            </a>{" "}
            — Open source under the MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://buymeacoffee.com/kingofmit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              Buy me a coffee
            </a>
            <a
              href="https://github.com/kingofmit/allem-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
