# @allem-sdk/auth

Authentication helpers for React. Provider-agnostic via an adapter interface — works with any auth backend.

## Installation

```bash
npm install @allem-sdk/auth
```

## Usage

```tsx
import { AuthProvider, useAuth, ProtectedRoute } from "@allem-sdk/auth";

// Define an adapter for your auth provider
const myAuthAdapter = {
  getSession: async () => {
    const res = await fetch("/api/auth/session");
    if (!res.ok) return null;
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

function App() {
  return (
    <AuthProvider adapter={myAuthAdapter}>
      <ProtectedRoute
        fallback={<LoginPage />}
        loadingFallback={<Spinner />}
      >
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, status, signOut } = useAuth();
  return <button onClick={signOut}>Sign out, {user?.name}</button>;
}
```

## Exports

- `AuthProvider` — Context provider with session management
- `useAuth` — Returns `user`, `status`, `isAuthenticated`, `isLoading`, `signIn`, `signOut`
- `useSession` — Returns `session` and `update` function
- `ProtectedRoute` — Renders children only when authenticated

## License

[MIT](../../LICENSE)
