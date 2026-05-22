<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/auth"><img src="https://img.shields.io/npm/v/@allem-sdk/auth.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

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

| Export | Type | Description |
|--------|------|-------------|
| `AuthProvider` | Component | Context provider with automatic session management |
| `useAuth` | Hook | Returns `user`, `status`, `isAuthenticated`, `isLoading`, `signIn`, `signOut` |
| `useSession` | Hook | Returns `session` object and `update` function |
| `ProtectedRoute` | Component | Renders children only when authenticated, with fallback support |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
