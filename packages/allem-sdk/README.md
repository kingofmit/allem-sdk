<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AI_SDK-v6-black" alt="AI SDK v6" />
  <img src="https://img.shields.io/badge/tests-44_passing-brightgreen" alt="Tests" />
</p>

# allem-sdk

The complete Allem SDK for React — hooks, AI, forms, analytics, and auth in a single install.

## Installation

```bash
npm install allem-sdk
```

Or install individual packages:

```bash
npm install @allem-sdk/hooks       # React hooks
npm install @allem-sdk/ai          # AI chat & completions
npm install @allem-sdk/forms       # Form management
npm install @allem-sdk/analytics   # Analytics tracking
npm install @allem-sdk/auth        # Authentication
```

## Quick Start

```tsx
import { useDebounce, useLocalStorage } from "allem-sdk/hooks";
import { useAllemChat } from "allem-sdk/ai";
import { useForm, required, email } from "allem-sdk/forms";
import { AnalyticsProvider, useTrack } from "allem-sdk/analytics";
import { AuthProvider, useAuth, ProtectedRoute } from "allem-sdk/auth";

// Or import everything from the root
import { useDebounce, useAllemChat, useForm, useAuth } from "allem-sdk";
```

## Packages

| Package | Description |
|---------|-------------|
| [`@allem-sdk/hooks`](https://www.npmjs.com/package/@allem-sdk/hooks) | 8 essential React hooks — useDebounce, useLocalStorage, useMediaQuery, and more |
| [`@allem-sdk/ai`](https://www.npmjs.com/package/@allem-sdk/ai) | AI hooks built on Vercel AI SDK v6 — multi-provider chat & completions |
| [`@allem-sdk/forms`](https://www.npmjs.com/package/@allem-sdk/forms) | Lightweight form management with 9 built-in validators |
| [`@allem-sdk/analytics`](https://www.npmjs.com/package/@allem-sdk/analytics) | Provider-agnostic analytics — works with Mixpanel, Segment, PostHog, etc. |
| [`@allem-sdk/auth`](https://www.npmjs.com/package/@allem-sdk/auth) | Authentication helpers — session management, protected routes |

## Features

- **SSR-safe** — works with Next.js, Vite, and Remix out of the box
- **TypeScript strict** — full type safety with exported types
- **Zero lock-in** — adapter pattern for AI, analytics, and auth providers
- **Tree-shakeable** — ESM + CJS builds, import only what you need
- **Lightweight** — no heavy dependencies, just React hooks

## Part of Allem SDK

This is the meta-package for the [Allem SDK](https://github.com/kingofmit/allem-sdk) monorepo. Install this package to get everything, or install individual `@allem-sdk/*` packages for smaller bundles.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
