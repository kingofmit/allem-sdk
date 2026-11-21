import Link from "next/link";

const DEMOS = [
  {
    href: "/hooks",
    tag: "@allem-sdk/hooks",
    title: "Hooks",
    description: "useDebounce, useLocalStorage, useMediaQuery, useToggle, and 4 more interactive demos.",
  },
  {
    href: "/chat",
    tag: "@allem-sdk/ai",
    title: "AI Chat",
    description: "Streaming chat with useAllemChat and createAllemChatHandler. Multi-provider support.",
  },
  {
    href: "/contact",
    tag: "@allem-sdk/forms",
    title: "Forms",
    description: "Contact form with useForm, validation rules, error display, and reset.",
  },
  {
    href: "/login",
    tag: "@allem-sdk/auth",
    title: "Auth",
    description: "Login flow with useAuth, mock adapter, and session management.",
  },
  {
    href: "/dashboard",
    tag: "@allem-sdk/auth",
    title: "Dashboard",
    description: "Protected route with ProtectedRoute, useSession, and page view tracking.",
  },
];

export default function Home() {
  return (
    <div>
      <div className="page-header" style={{ marginBottom: "2.5rem" }}>
        <h1>Allem SDK Examples</h1>
        <p style={{ marginTop: "0.5rem" }}>
          Interactive demos of all <code>@allem-sdk</code> packages in a Next.js App Router project.
        </p>
      </div>

      <div className="grid-cards">
        {DEMOS.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="card card-interactive"
            style={{ textDecoration: "none" }}
          >
            <span className="card-tag">{demo.tag}</span>
            <h2>{demo.title}</h2>
            <p style={{ marginTop: "0.375rem", fontSize: "0.875rem" }}>
              {demo.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
