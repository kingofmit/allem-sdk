export default function AuthProviderPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AuthProvider</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Wraps your app with auth context. Calls <code className="font-mono text-sm">adapter.getSession()</code> on mount to restore session.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { AuthProvider } from "@allem-sdk/auth";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">AuthAdapter interface</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`interface AuthAdapter {
  getSession: () => Promise<AuthSession>;
  signIn: (credentials: Record<string, string>) => Promise<AuthSession>;
  signOut: () => Promise<void>;
}

interface AuthSession {
  user: AuthUser | null;
  token: string | null;
  expiresAt: number | null;
}

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  [key: string]: unknown;
}`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Example adapter</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const myAuthAdapter: AuthAdapter = {
  getSession: async () => {
    const res = await fetch("/api/auth/session");
    if (!res.ok) return { user: null, token: null, expiresAt: null };
    return res.json();
  },
  signIn: async (credentials) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return res.json();
  },
  signOut: async () => {
    await fetch("/api/auth/signout", { method: "POST" });
  },
};

<AuthProvider adapter={myAuthAdapter}>
  <App />
</AuthProvider>`}</pre>
      </div>
    </div>
  );
}
