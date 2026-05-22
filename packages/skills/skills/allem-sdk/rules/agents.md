# Agents

```tsx
// Client
import { useAllemAgent, AgentProvider, useAgentTools } from "@allem-sdk/agents";

// Server
import { createAllemAgentHandler, createAllemTool } from "@allem-sdk/agents";
```

Requires peer dependencies: `@allem-sdk/ai`, `ai`, `@ai-sdk/react`, and at least one provider (`@ai-sdk/google`, `@ai-sdk/anthropic`, or `@ai-sdk/openai`). Optionally install `zod` for typed tool definitions.

## useAllemAgent

Agent hook with status tracking, step history, and tool call awareness. Reads configuration from `AllemAIProvider`.

| Option | Type | Description |
|--------|------|-------------|
| `api` | `string` | Override API endpoint from provider |
| `model` | `string` | Model identifier (e.g. `"gemini-2.0-flash"`) |
| `provider` | `"google" \| "anthropic" \| "openai"` | Provider name |
| `systemPrompt` | `string` | System prompt sent with requests |
| `headers` | `Record<string, string>` | Extra headers merged with provider headers |
| `experimental_throttle` | `number` | Throttle wait in ms for updates |

Returns all `UseChatHelpers` properties plus:

| Property | Type | Description |
|----------|------|-------------|
| `agentStatus` | `AgentStatus` | `"idle" \| "thinking" \| "calling-tool" \| "done"` |
| `steps` | `AgentStep[]` | Ordered list of steps taken in the current turn |
| `currentToolCalls` | `AgentToolCall[]` | Tool calls from the most recent step |
| `isAgentRunning` | `boolean` | Whether the agent is actively processing |

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

## AgentProvider

Optional context provider for registering tool metadata (names and descriptions) for client-side UI display. This does NOT contain tool implementations.

| Prop | Type | Description |
|------|------|-------------|
| `tools` | `AgentToolRegistration[]` | Tool metadata array |
| `children` | `ReactNode` | Child components |

```tsx
<AgentProvider tools={[
  { name: "weather", description: "Get current weather" },
  { name: "search", description: "Search the web" },
]}>
  <App />
</AgentProvider>
```

## useAgentTools

Hook to read registered tool metadata from the nearest `AgentProvider`. Returns `AgentToolRegistration[]`.

```tsx
const tools = useAgentTools();
// [{ name: "weather", description: "Get current weather" }, ...]
```

## createAllemAgentHandler

Server-side request handler for agentic workflows with tool calling. Same pattern as `createAllemChatHandler` but designed for agent use cases.

| Option | Type | Description |
|--------|------|-------------|
| `providers` | `Record<string, (modelId?) => LanguageModel>` | Provider factory map |
| `defaultProvider` | `string` | Default provider name (default: `"google"`) |
| `defaultModel` | `string` | Default model ID |
| `systemPrompt` | `string` | Default system prompt |
| `tools` | `ToolSet` | Tools available to the agent |

```ts
// app/api/agent/route.ts
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

## createAllemTool

Typed tool definition helper with zod schema validation.

| Option | Type | Description |
|--------|------|-------------|
| `description` | `string` | Human-readable tool description |
| `parameters` | `z.ZodType` | Zod schema for input parameters |
| `execute` | `(params) => Promise<unknown>` | Async execution function |

```ts
const searchTool = createAllemTool({
  description: "Search the web",
  parameters: z.object({
    query: z.string(),
    limit: z.number().optional(),
  }),
  execute: async ({ query, limit = 5 }) => {
    return await searchAPI(query, limit);
  },
});
```

## Best practices

- Wrap your app in `<AllemAIProvider>` to share configuration between `useAllemChat` and `useAllemAgent`
- Use `agentStatus` to show contextual UI (e.g. "Calling tool..." when status is `"calling-tool"`)
- Use `steps` to display a history of what the agent has done
- `AgentProvider` is optional and only needed if you want to display tool metadata in your UI
- Set provider API keys in `.env.local`: `GOOGLE_GENERATIVE_AI_API_KEY`, `ANTHROPIC_API_KEY`, or `OPENAI_API_KEY`
- Use `createAllemTool` with zod schemas for type-safe tool definitions
