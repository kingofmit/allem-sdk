<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@allem-sdk/agents"><img src="https://img.shields.io/npm/v/@allem-sdk/agents.svg" alt="npm version" /></a>
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AI_SDK-v6-black" alt="AI SDK v6" />
</p>

# @allem-sdk/agents

Agentic AI hooks for React. Multi-step tool calling, agent status tracking, and typed tool definitions built on [Vercel AI SDK v6](https://sdk.vercel.ai).

## Installation

```bash
npm install @allem-sdk/agents @allem-sdk/ai ai @ai-sdk/react

# Install at least one provider
npm install @ai-sdk/google    # Google Gemini
npm install @ai-sdk/anthropic # Anthropic Claude
npm install @ai-sdk/openai    # OpenAI GPT

# For defining tools with schemas
npm install zod
```

## Client Usage

```tsx
import { AllemAIProvider } from "@allem-sdk/ai";
import { useAllemAgent } from "@allem-sdk/agents";

function App() {
  return (
    <AllemAIProvider api="/api/agent" provider="google">
      <Agent />
    </AllemAIProvider>
  );
}

function Agent() {
  const {
    messages,
    sendMessage,
    agentStatus,
    steps,
    currentToolCalls,
    isAgentRunning,
  } = useAllemAgent();

  return (
    <div>
      {agentStatus === "calling-tool" && (
        <p>Using tool: {currentToolCalls[0]?.toolName}</p>
      )}
      {messages.map((m) => (
        <div key={m.id}>
          {m.parts?.filter((p) => p.type === "text").map((p) => p.text).join("")}
        </div>
      ))}
      <p>Steps taken: {steps.length}</p>
    </div>
  );
}
```

## Server Usage

```ts
// app/api/agent/route.ts (Next.js)
import { createAllemAgentHandler, createAllemTool } from "@allem-sdk/agents";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const weatherTool = createAllemTool({
  description: "Get the current weather for a location",
  parameters: z.object({ city: z.string() }),
  execute: async ({ city }) => {
    return { city, temperature: 72, condition: "sunny" };
  },
});

export const POST = createAllemAgentHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
  },
  tools: { weather: weatherTool },
});
```

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `useAllemAgent` | Hook | Agent hook with status tracking, step history, and tool call awareness |
| `AgentProvider` | Component | Optional context for registering tool metadata (names/descriptions) |
| `useAgentTools` | Hook | Read registered tool metadata from AgentProvider |
| `createAllemAgentHandler` | Server | Request handler with tool calling support for agentic workflows |
| `createAllemTool` | Server | Typed tool definition helper with zod schema validation |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
