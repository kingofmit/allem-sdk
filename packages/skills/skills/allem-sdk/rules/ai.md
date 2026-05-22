# AI

```tsx
// Client
import { AllemAIProvider, useAllemChat, useAllemCompletion } from "@allem-sdk/ai";

// Server
import { createAllemChatHandler } from "@allem-sdk/ai";
```

Requires peer dependencies: `ai`, `@ai-sdk/react`, and at least one provider (`@ai-sdk/google`, `@ai-sdk/anthropic`, or `@ai-sdk/openai`).

## AllemAIProvider

Context provider for default AI configuration.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `api` | `string` | `"/api/chat"` | API endpoint for chat requests |
| `provider` | `"google" \| "anthropic" \| "openai"` | — | Default provider name |
| `model` | `string` | — | Default model identifier |
| `headers` | `Record<string, string>` | — | Default headers for requests |

```tsx
<AllemAIProvider api="/api/chat" provider="google" model="gemini-2.0-flash">
  <App />
</AllemAIProvider>
```

## useAllemChat

Chat hook with streaming, message history, and provider context.

| Option | Type | Description |
|--------|------|-------------|
| `api` | `string` | Override API endpoint from provider |
| `model` | `string` | Model identifier (e.g. `"gemini-2.0-flash"`) |
| `provider` | `"google" \| "anthropic" \| "openai"` | Provider name |
| `systemPrompt` | `string` | System prompt sent with requests |
| `headers` | `Record<string, string>` | Extra headers merged with provider headers |
| `experimental_throttle` | `number` | Throttle wait in ms for updates |

Returns `UseChatHelpers<UIMessage>` from AI SDK:
- `messages` — Array of chat messages
- `sendMessage({ text })` — Send a message
- `status` — `"ready" | "submitted" | "streaming"`
- `stop()` — Stop streaming
- `setMessages()` — Replace message history

```tsx
const { messages, sendMessage, status } = useAllemChat({
  provider: "anthropic",
  model: "claude-sonnet-4-20250514",
  systemPrompt: "You are a helpful assistant.",
});

const isLoading = status === "submitted" || status === "streaming";

// Send a message
await sendMessage({ text: "Hello!" });

// Render messages
messages.map((m) => (
  <div key={m.id}>
    {m.parts?.filter((p) => p.type === "text").map((p) => p.text).join("")}
  </div>
));
```

## useAllemCompletion

Text completion hook for single-turn prompts.

| Option | Type | Description |
|--------|------|-------------|
| `api` | `string` | Override API endpoint |
| `headers` | `Record<string, string>` | Extra headers |

Returns `UseCompletionHelpers` from AI SDK.

## createAllemChatHandler

Server-side API route handler. Works with Next.js App Router, Remix, and any Web Request/Response framework.

| Option | Type | Description |
|--------|------|-------------|
| `providers` | `Record<string, (modelId?) => LanguageModel>` | Provider factory map |
| `defaultProvider` | `string` | Default provider name (default: `"google"`) |
| `defaultModel` | `string` | Default model ID |
| `systemPrompt` | `string` | Default system prompt |
| `tools` | `ToolSet` | Tools available to the model |

```ts
// app/api/chat/route.ts
import { createAllemChatHandler } from "@allem-sdk/ai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

export const POST = createAllemChatHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
    anthropic: (model) => anthropic(model ?? "claude-sonnet-4-20250514"),
  },
  defaultProvider: "google",
  systemPrompt: "You are a helpful assistant.",
});
```

## Best practices

- Always wrap your app in `<AllemAIProvider>` to avoid passing `api` and `provider` to every hook call
- Use `status` to show loading states — check for `"submitted"` or `"streaming"`
- The handler automatically routes to the correct provider based on the `provider` field in the request body
- Set `GOOGLE_GENERATIVE_AI_API_KEY`, `ANTHROPIC_API_KEY`, or `OPENAI_API_KEY` in `.env.local`
- Provider peer dependencies are optional — only install the ones you use
