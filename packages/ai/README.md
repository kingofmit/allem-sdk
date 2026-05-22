# @allem-sdk/ai

AI hooks for React built on [Vercel AI SDK v6](https://sdk.vercel.ai). Multi-provider support (Google, Anthropic, OpenAI) with a unified API.

## Installation

```bash
npm install @allem-sdk/ai ai @ai-sdk/react

# Install at least one provider
npm install @ai-sdk/google    # Google Gemini
npm install @ai-sdk/anthropic # Anthropic Claude
npm install @ai-sdk/openai    # OpenAI GPT
```

## Client Usage

```tsx
import { useState } from "react";
import { AllemAIProvider, useAllemChat } from "@allem-sdk/ai";

function App() {
  return (
    <AllemAIProvider api="/api/chat" provider="google">
      <Chat />
    </AllemAIProvider>
  );
}

function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useAllemChat();
  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          {m.parts?.filter((p) => p.type === "text").map((p) => p.text).join("")}
        </div>
      ))}
      <form onSubmit={async (e) => {
        e.preventDefault();
        const text = input;
        setInput("");
        await sendMessage({ text });
      }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Server Usage

```ts
// app/api/chat/route.ts (Next.js)
import { createAllemChatHandler } from "@allem-sdk/ai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

export const POST = createAllemChatHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
    anthropic: (model) => anthropic(model ?? "claude-sonnet-4-20250514"),
  },
  defaultProvider: "google",
});
```

## Exports

- `useAllemChat` — Chat hook with provider context
- `useAllemCompletion` — Text completion hook
- `AllemAIProvider` — React context provider for default config
- `createAllemChatHandler` — Server-side API route handler

## License

[MIT](../../LICENSE)
