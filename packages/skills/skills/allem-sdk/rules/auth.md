# Auth

```tsx
import { AuthProvider, useAuth, useSession, ProtectedRoute } from "@allem-sdk/auth";
```

## AuthAdapter interface

Implement this interface for your auth backend:

```tsx
interface AuthAdapter {
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
}
```

### Example adapter

```tsx
const myAuthAdapter: AuthAdapter = {
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
```

## AuthProvider

Wraps your app with auth context. Calls `adapter.getSession()` on mount to restore session.

| Prop | Type | Description |
|------|------|-------------|
| `adapter` | `AuthAdapter` | Your auth adapter implementation |

```tsx
<AuthProvider adapter={myAuthAdapter}>
  <App />
</AuthProvider>
```

## useAuth

Returns the current auth state and actions.

| Property | Type | Description |
|----------|------|-------------|
| `user` | `AuthUser \| null` | Current user or null |
| `status` | `"loading" \| "authenticated" \| "unauthenticated"` | Auth state |
| `isAuthenticated` | `boolean` | Shorthand for `status === "authenticated"` |
| `isLoading` | `boolean` | Shorthand for `status === "loading"` |
| `signIn(credentials)` | `(creds: Record<string, string>) => Promise<void>` | Sign in |
| `signOut()` | `() => Promise<void>` | Sign out |

```tsx
const { user, status, signIn, signOut } = useAuth();

// Sign in
await signIn({ email: "user@example.com", password: "secret" });

// Check status
if (status === "loading") return <Spinner />;
if (status === "unauthenticated") return <LoginPage />;

// Use user data
<p>Welcome, {user?.name}</p>
<button onClick={signOut}>Sign Out</button>
```

## useSession

Returns the raw session object and a refresh function.

| Property | Type | Description |
|----------|------|-------------|
| `session` | `AuthSession \| null` | Current session with user, token, expiresAt |
| `update` | `() => Promise<void>` | Re-fetch the session from the adapter |

```tsx
const { session, update } = useSession();

// Access token for API calls
const headers = { Authorization: `Bearer ${session?.token}` };

// Refresh session after profile update
await update();
```

## ProtectedRoute

Renders children only when authenticated. Shows fallback otherwise.

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Content to show when authenticated |
| `fallback` | `ReactNode` | Content to show when not authenticated |
| `loadingFallback` | `ReactNode` | Content to show while loading (optional) |

```tsx
<ProtectedRoute
  fallback={<LoginPage />}
  loadingFallback={<Spinner />}
>
  <Dashboard />
</ProtectedRoute>
```

## Best practices

- `AuthProvider` calls `getSession()` on mount — use this to restore sessions from cookies/tokens
- `signIn` sets status to `"loading"` then `"authenticated"` or `"unauthenticated"` based on the response
- `ProtectedRoute` is a convenience wrapper — for more control, use `useAuth()` directly
- The `credentials` passed to `signIn` is a generic `Record<string, string>` — pass whatever your backend expects
- Must be used within `<AuthProvider>` — throws an error if called outside the provider
