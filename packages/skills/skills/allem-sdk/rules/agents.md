# Agents

```tsx
// Client
import { useAllemAgent, AgentProvider, useAgentTools } from "@allem-sdk/agents";

// Server
import {
  createAllemAgentHandler,
  createAllemTool,
  createAllemGuardrail,
  createMemoryAdapter,
  thinkThenAct,
  planExecuteVerify,
  restrictAfter,
  stepCountIs,
  isLoopFinished,
  hasToolCall,
} from "@allem-sdk/agents";
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

## createAllemAgentHandler

Server-side request handler for agentic workflows. Full configuration:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `providers` | `Record<string, (modelId?) => LanguageModel>` | — | Provider factory map |
| `defaultProvider` | `string` | `"google"` | Default provider name |
| `defaultModel` | `string` | — | Default model ID |
| `systemPrompt` | `string` | — | Default system prompt |
| `tools` | `ToolSet` | — | Tools available to the agent |
| `maxSteps` | `number` | `10` | Maximum steps per turn |
| `stopWhen` | `StopCondition \| StopCondition[]` | `stepCountIs(maxSteps)` | Custom stop condition |
| `prepareStep` | `PrepareStepFunction` | — | Per-step control of model, tools, prompt |
| `repairToolCall` | `ToolCallRepairFunction` | — | Auto-repair malformed tool calls |
| `middleware` | `LanguageModelMiddleware \| LanguageModelMiddleware[]` | — | Guardrail middleware |
| `context` | `unknown` | — | Shared mutable context across steps |
| `memory` | `AgentMemoryAdapter` | — | Cross-session message persistence |
| `onStepFinish` | `(stepResult) => void` | — | Callback after each step |
| `onFinish` | `(event) => void` | — | Callback when agent finishes |

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

## Planning Templates

Built-in `prepareStep` functions for common agent patterns. Pass them directly to `createAllemAgentHandler({ prepareStep })`.

### thinkThenAct

Step 0 forces the model to reason without tools (`toolChoice: "none"`), then step 1+ enables tools.

```ts
import { thinkThenAct } from "@allem-sdk/agents";

createAllemAgentHandler({
  prepareStep: thinkThenAct(),
  // Optional: override the thinking step prompt
  // prepareStep: thinkThenAct({ thinkingPrompt: "Analyze the request carefully." }),
  tools: { weather, search },
  // ...
});
```

### planExecuteVerify

Three-phase pattern: plan (no tools) → execute (tools enabled) → verify (no tools, summarize results).

```ts
import { planExecuteVerify } from "@allem-sdk/agents";

createAllemAgentHandler({
  prepareStep: planExecuteVerify({ verifyAtStep: 5 }),
  maxSteps: 6,
  // Optional prompts:
  // prepareStep: planExecuteVerify({ verifyAtStep: 5, planPrompt: "...", verifyPrompt: "..." }),
  tools: { search, calculate },
  // ...
});
```

### restrictAfter

After step N, restricts the agent to a subset of tools. Useful for guardrails — allow search early, but only "respond" later.

```ts
import { restrictAfter } from "@allem-sdk/agents";

createAllemAgentHandler({
  prepareStep: restrictAfter(3, ["respond"]),
  tools: { search, calculate, respond },
  // ...
});
```

## Guardrails

Use `createAllemGuardrail` to create middleware that intercepts model calls for safety, logging, or filtering.

```ts
import { createAllemGuardrail } from "@allem-sdk/agents";

const noSecrets = createAllemGuardrail({
  name: "no-secrets",
  beforeModel: async ({ params }) => {
    const text = JSON.stringify(params.prompt);
    if (/api[_-]?key/i.test(text)) {
      throw new Error("Blocked: request contains sensitive content");
    }
    return params;
  },
});

const logger = createAllemGuardrail({
  name: "step-logger",
  wrapGenerate: async ({ doGenerate }) => {
    const start = Date.now();
    const result = await doGenerate();
    console.log(`LLM call took ${Date.now() - start}ms`);
    return result;
  },
});

createAllemAgentHandler({
  middleware: [noSecrets, logger],
  // ...
});
```

| Config | Type | Description |
|--------|------|-------------|
| `name` | `string` | Human-readable name for logging |
| `beforeModel` | `transformParams` | Inspect/modify params before model call. Throw to block. |
| `wrapGenerate` | `wrapGenerate` | Wrap the generate call for logging, retry, or result modification |
| `wrapStream` | `wrapStream` | Wrap the stream call for content filtering on streams |

## Memory

Use `AgentMemoryAdapter` for cross-session message persistence. The handler loads previous messages before each turn and saves after the agent finishes.

```ts
import { createMemoryAdapter } from "@allem-sdk/agents";

// In-memory adapter (dev/testing — lost on restart)
const memory = createMemoryAdapter();

createAllemAgentHandler({
  memory,
  // ...
});
```

### Custom memory adapter

Implement `AgentMemoryAdapter` for production storage:

```ts
import type { AgentMemoryAdapter } from "@allem-sdk/agents";

const redisMemory: AgentMemoryAdapter = {
  load: async (sessionId) => {
    const data = await redis.get(`agent:${sessionId}`);
    return data ? JSON.parse(data) : [];
  },
  save: async (sessionId, messages) => {
    await redis.set(`agent:${sessionId}`, JSON.stringify(messages));
  },
  clear: async (sessionId) => {
    await redis.del(`agent:${sessionId}`);
  },
};
```

The client sends `sessionId` in the request body. The handler uses it to load/save messages:

```tsx
// Client-side: pass sessionId via body
const { sendMessage } = useAllemAgent();
await sendMessage({ text: "Hello" }); // sessionId is managed by the handler
```

## Error Recovery

Use `repairToolCall` to auto-fix malformed tool calls instead of failing:

```ts
createAllemAgentHandler({
  repairToolCall: async ({ toolCall, tools, parameterSchema, error }) => {
    // Example: fix missing required fields by providing defaults
    if (error.name === "InvalidToolInputError") {
      return { ...toolCall, args: { ...toolCall.args, limit: 5 } };
    }
    return null; // skip this tool call
  },
  // ...
});
```

## Shared Context

Use `context` to share mutable state across all steps within a turn:

```ts
createAllemAgentHandler({
  context: { visitedUrls: [], searchCount: 0 },
  prepareStep: ({ stepNumber, context }) => {
    // Access context in prepareStep
    if (context.searchCount > 3) {
      return { toolChoice: "none" }; // stop searching
    }
    return undefined;
  },
  tools: {
    search: createAllemTool({
      description: "Search",
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }, { context }) => {
        context.searchCount++;
        // ...
      },
    }),
  },
});
```

## Stop Conditions

Re-exported from AI SDK for convenience:

```ts
import { stepCountIs, isLoopFinished, hasToolCall } from "@allem-sdk/agents";

createAllemAgentHandler({
  stopWhen: stepCountIs(5),
  // or: stopWhen: [stepCountIs(10), hasToolCall("finalAnswer")],
  // ...
});
```

## Best practices

- Wrap your app in `<AllemAIProvider>` to share configuration between `useAllemChat` and `useAllemAgent`
- Use `agentStatus` to show contextual UI (e.g. "Calling tool..." when status is `"calling-tool"`)
- Use `thinkThenAct()` for agents that should reason before acting — reduces tool call errors
- Stack guardrails with `middleware: [noSecrets, logger, rateLimiter]` — they run in order
- Use `createMemoryAdapter()` in development, implement `AgentMemoryAdapter` with a database for production
- Use `repairToolCall` for production agents — prevents failures from malformed LLM tool calls
- `AgentProvider` is optional and only needed if you want to display tool metadata in your UI
- Set provider API keys in `.env.local`: `GOOGLE_GENERATIVE_AI_API_KEY`, `ANTHROPIC_API_KEY`, or `OPENAI_API_KEY`
