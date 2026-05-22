import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { title: "Overview", href: "/docs/hooks" },
      { title: "useDebounce", href: "/docs/hooks/use-debounce" },
      { title: "useLocalStorage", href: "/docs/hooks/use-local-storage" },
      { title: "useMediaQuery", href: "/docs/hooks/use-media-query" },
      { title: "useClickOutside", href: "/docs/hooks/use-click-outside" },
      { title: "useToggle", href: "/docs/hooks/use-toggle" },
      { title: "useCopyToClipboard", href: "/docs/hooks/use-copy-to-clipboard" },
      { title: "useIntersectionObserver", href: "/docs/hooks/use-intersection-observer" },
      { title: "useWindowSize", href: "/docs/hooks/use-window-size" },
    ],
  },
  {
    title: "AI",
    items: [
      { title: "Overview", href: "/docs/ai" },
      { title: "AllemAIProvider", href: "/docs/ai/allem-ai-provider" },
      { title: "useAllemAIConfig", href: "/docs/ai/use-allem-ai-config" },
      { title: "useAllemChat", href: "/docs/ai/use-allem-chat" },
      { title: "useAllemCompletion", href: "/docs/ai/use-allem-completion" },
      { title: "createAllemChatHandler", href: "/docs/ai/create-allem-chat-handler" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Overview", href: "/docs/forms" },
      { title: "useForm", href: "/docs/forms/use-form" },
      { title: "useField", href: "/docs/forms/use-field" },
      { title: "Validators", href: "/docs/forms/validators" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { title: "Overview", href: "/docs/analytics" },
      { title: "AnalyticsProvider", href: "/docs/analytics/analytics-provider" },
      { title: "useTrack", href: "/docs/analytics/use-track" },
      { title: "usePageView", href: "/docs/analytics/use-page-view" },
      { title: "useIdentify", href: "/docs/analytics/use-identify" },
    ],
  },
  {
    title: "Auth",
    items: [
      { title: "Overview", href: "/docs/auth" },
      { title: "AuthProvider", href: "/docs/auth/auth-provider" },
      { title: "useAuth", href: "/docs/auth/use-auth" },
      { title: "useSession", href: "/docs/auth/use-session" },
      { title: "ProtectedRoute", href: "/docs/auth/protected-route" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/80 backdrop-blur-lg dark:border-neutral-800/50 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Allem SDK
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/docs/getting-started"
                className="text-sm font-medium text-neutral-900 dark:text-white"
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
          <ThemeToggle />
        </div>
      </nav>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 lg:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
            <nav className="flex flex-col gap-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col gap-0.5">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-8 py-12 lg:px-16">{children}</main>
      </div>
    </div>
  );
}
