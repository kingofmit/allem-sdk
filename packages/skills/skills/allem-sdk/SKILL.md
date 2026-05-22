---
name: allem-sdk-best-practices
description: Best practices for Allem SDK — React hooks for AI, forms, analytics, auth, and utilities
tags: allem-sdk, react, hooks, ai, forms, analytics, auth
---

## When to use
Apply this skill when working with Allem SDK hooks for domain-specific expertise.

## Overview
Allem SDK is a collection of React hooks for building modern applications. It provides hooks for AI chat (built on Vercel AI SDK v6), form management with validation, provider-agnostic analytics, authentication with session management, and 8 essential utility hooks. All hooks are SSR-safe and work with Next.js, Vite, and Remix.

## Packages

| Package | Install | Description |
|---------|---------|-------------|
| `allem-sdk` | `npm i allem-sdk` | Meta-package — installs everything |
| `@allem-sdk/hooks` | `npm i @allem-sdk/hooks` | 8 essential React hooks |
| `@allem-sdk/ai` | `npm i @allem-sdk/ai` | AI chat & completion hooks (Vercel AI SDK v6) |
| `@allem-sdk/forms` | `npm i @allem-sdk/forms` | Form management with 9 validators |
| `@allem-sdk/analytics` | `npm i @allem-sdk/analytics` | Provider-agnostic analytics |
| `@allem-sdk/auth` | `npm i @allem-sdk/auth` | Authentication & session management |

## New project setup

```bash
# Everything at once
npm i allem-sdk

# Or individual packages
npm i @allem-sdk/hooks @allem-sdk/forms @allem-sdk/auth @allem-sdk/analytics

# AI requires peer dependencies
npm i @allem-sdk/ai ai @ai-sdk/react @ai-sdk/google
```

## Core conventions

### SSR safety
All hooks check `typeof window` before accessing browser APIs. They work in server-rendered environments without additional configuration.

### Import patterns
```tsx
// From meta-package
import { useDebounce, useForm, useAuth } from "allem-sdk";

// Sub-path imports
import { useDebounce } from "allem-sdk/hooks";
import { useAllemChat } from "allem-sdk/ai";

// From individual packages
import { useDebounce } from "@allem-sdk/hooks";
import { useAllemChat } from "@allem-sdk/ai";
```

### Adapter pattern
AI, analytics, and auth packages use an adapter pattern for zero vendor lock-in. You provide a thin adapter object that maps to your backend/provider.

### Client components
All hooks include the `"use client"` directive. In Next.js App Router, import them directly in server components — the directive is already in the package.

## Quick examples

### Hooks
```tsx
import { useDebounce, useLocalStorage, useToggle } from "@allem-sdk/hooks";

const [query, setQuery] = useLocalStorage("search", "");
const debouncedQuery = useDebounce(query, 300);
const [isOpen, toggle] = useToggle(false);
```

### AI Chat
```tsx
import { AllemAIProvider, useAllemChat } from "@allem-sdk/ai";

// Wrap your app
<AllemAIProvider api="/api/chat" provider="google">
  <Chat />
</AllemAIProvider>

// In a component
const { messages, sendMessage, status } = useAllemChat();
```

### Server route
```ts
import { createAllemChatHandler } from "@allem-sdk/ai";
import { google } from "@ai-sdk/google";

export const POST = createAllemChatHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
  },
});
```

### Forms
```tsx
import { useForm, required, email } from "@allem-sdk/forms";

const form = useForm({
  email: { initialValue: "", rules: [required(), email()] },
});

<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.getFieldProps("email")} />
</form>
```

### Analytics
```tsx
import { AnalyticsProvider, useTrack } from "@allem-sdk/analytics";

<AnalyticsProvider adapters={[mixpanelAdapter, posthogAdapter]}>
  <App />
</AnalyticsProvider>

const track = useTrack();
track("Add to Cart", { productId: "123" });
```

### Auth
```tsx
import { AuthProvider, useAuth, ProtectedRoute } from "@allem-sdk/auth";

<AuthProvider adapter={myAuthAdapter}>
  <ProtectedRoute fallback={<Login />}>
    <Dashboard />
  </ProtectedRoute>
</AuthProvider>

const { user, signIn, signOut, status } = useAuth();
```

## Additional resources
Consult the rule files in the `rules/` directory for detailed per-package API reference and best practices:
- Utility hooks: useDebounce, useLocalStorage, useMediaQuery, useClickOutside, useToggle, useCopyToClipboard, useIntersectionObserver, useWindowSize
- AI: AllemAIProvider, useAllemAIConfig, useAllemChat, useAllemCompletion, createAllemChatHandler
- Forms: useForm, useField, validators
- Analytics: AnalyticsProvider, useTrack, usePageView, useIdentify
- Auth: AuthProvider, useAuth, useSession, ProtectedRoute
