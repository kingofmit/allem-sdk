---
name: allem-sdk-best-practices
description: Best practices for Allem SDK — React hooks for AI agents, chat, forms, analytics, auth, storage, notifications, realtime, and utilities
tags: allem-sdk, react, hooks, ai, agents, forms, analytics, auth, storage, notifications, realtime
---

## When to use
Apply this skill when working with Allem SDK hooks for domain-specific expertise.

## Overview
Allem SDK is a collection of React hooks for building modern applications. It provides 13 utility hooks, AI chat and agentic AI (built on Vercel AI SDK v6), form management with validation, provider-agnostic analytics, authentication with session management, key-value storage, headless notifications, and realtime WebSocket/SSE. All hooks are SSR-safe and work with Next.js, Vite, and Remix.

## Packages

| Package | Install | Description |
|---------|---------|-------------|
| `allem-sdk` | `npm i allem-sdk` | Meta-package — installs everything |
| `@allem-sdk/hooks` | `npm i @allem-sdk/hooks` | 13 React hooks (useDebounce, useFetch, useThrottle, ...) |
| `@allem-sdk/ai` | `npm i @allem-sdk/ai` | AI chat & completion hooks (Vercel AI SDK v6) |
| `@allem-sdk/agents` | `npm i @allem-sdk/agents` | Agentic AI with tool loops, guardrails, memory, planning |
| `@allem-sdk/forms` | `npm i @allem-sdk/forms` | Form management with 9 validators |
| `@allem-sdk/analytics` | `npm i @allem-sdk/analytics` | Analytics with Mixpanel, PostHog, Segment adapters |
| `@allem-sdk/auth` | `npm i @allem-sdk/auth` | Auth with Supabase, NextAuth, Clerk adapters |
| `@allem-sdk/storage` | `npm i @allem-sdk/storage` | Key-value storage (localStorage, cookies, memory) |
| `@allem-sdk/notifications` | `npm i @allem-sdk/notifications` | Headless toast/notification system |
| `@allem-sdk/realtime` | `npm i @allem-sdk/realtime` | WebSocket/SSE with channels and presence |

## New project setup

```bash
# Everything at once
npm i allem-sdk

# Or individual packages
npm i @allem-sdk/hooks @allem-sdk/forms @allem-sdk/auth @allem-sdk/analytics

# AI requires peer dependencies
npm i @allem-sdk/ai ai @ai-sdk/react @ai-sdk/google

# Agents (extends AI)
npm i @allem-sdk/agents @allem-sdk/ai ai @ai-sdk/react @ai-sdk/google zod
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

### AI Agent
```tsx
import { AllemAIProvider } from "@allem-sdk/ai";
import { useAllemAgent } from "@allem-sdk/agents";

// Wrap your app
<AllemAIProvider api="/api/agent" provider="google">
  <Agent />
</AllemAIProvider>

// In a component
const { messages, sendMessage, agentStatus, steps, currentToolCalls } = useAllemAgent();
```

### Agent server route
```ts
import { createAllemAgentHandler, createAllemTool } from "@allem-sdk/agents";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const weatherTool = createAllemTool({
  description: "Get weather",
  parameters: z.object({ city: z.string() }),
  execute: async ({ city }) => ({ city, temp: 72 }),
});

export const POST = createAllemAgentHandler({
  providers: { google: (model) => google(model ?? "gemini-2.0-flash") },
  tools: { weather: weatherTool },
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

### Storage
```tsx
import { StorageProvider, useStorageItem, localStorageAdapter } from "@allem-sdk/storage";

<StorageProvider adapter={localStorageAdapter()}>
  <App />
</StorageProvider>

const [theme, setTheme] = useStorageItem("theme", "light");
```

### Notifications
```tsx
import { NotificationProvider, useNotify } from "@allem-sdk/notifications";

<NotificationProvider>
  <App />
</NotificationProvider>

const { notify } = useNotify();
notify({ title: "Saved!", type: "success" });
```

### Realtime
```tsx
import { RealtimeProvider, useChannel, usePresence } from "@allem-sdk/realtime";

<RealtimeProvider adapter={myAdapter}>
  <App />
</RealtimeProvider>

const { publish } = useChannel("room", (data) => console.log(data));
const members = usePresence("room", { name: "Ahmed" });
```

## Additional resources
Consult the rule files in the `rules/` directory for detailed per-package API reference and best practices:
- Hooks: useDebounce, useThrottle, useLocalStorage, useMediaQuery, useClickOutside, useToggle, useCopyToClipboard, useIntersectionObserver, useWindowSize, useFetch, usePrevious, useKeyPress, useOnlineStatus
- AI: AllemAIProvider, useAllemAIConfig, useAllemChat, useAllemCompletion, createAllemChatHandler
- Agents: useAllemAgent, AgentProvider, createAllemAgentHandler, createAllemTool, createAllemGuardrail, createMemoryAdapter, thinkThenAct, planExecuteVerify, restrictAfter
- Forms: useForm, useField, validators
- Analytics: AnalyticsProvider, useTrack, usePageView, useIdentify, mixpanelAdapter, posthogAdapter, segmentAdapter, consoleAdapter
- Auth: AuthProvider, useAuth, useSession, ProtectedRoute, supabaseAdapter, nextAuthAdapter, clerkAdapter
- Storage: StorageProvider, useStorageItem, useStorageAdapter, localStorageAdapter, cookieAdapter, memoryAdapter
- Notifications: NotificationProvider, useNotify, useNotifications
- Realtime: RealtimeProvider, useChannel, usePresence, useConnectionStatus
