<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-18+-61dafb" alt="React 18+" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AI_SDK-v6-black" alt="AI SDK v6" />
</p>

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

| Export | Type | Description |
|--------|------|-------------|
| `useAllemChat` | Hook | Chat hook with streaming, provider context, and message history |
| `useAllemCompletion` | Hook | Text completion hook for single-turn prompts |
| `AllemAIProvider` | Component | React context provider for default API and provider config |
| `createAllemChatHandler` | Server | Server-side API route handler with multi-provider routing |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
