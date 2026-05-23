import {
  ToolLoopAgent,
  createAgentUIStreamResponse,
  stepCountIs,
  wrapLanguageModel,
  type LanguageModel,
  type LanguageModelMiddleware,
  type ToolSet,
  type StopCondition,
  type PrepareStepFunction,
  type ToolCallRepairFunction,
} from "ai";
import type { AgentMemoryAdapter } from "./memory";

export type AllemProviderName = "google" | "anthropic" | "openai";

export interface AllemAgentHandlerConfig {
  /** Map of provider name to a function that returns a LanguageModel for a given model ID. */
  providers: Partial<
    Record<AllemProviderName, (modelId?: string) => LanguageModel>
  >;
  /** Default provider when none is specified in the request. Default: "google". */
  defaultProvider?: AllemProviderName;
  /** Default model ID when none is specified in the request. */
  defaultModel?: string;
  /** Default system prompt. */
  systemPrompt?: string;
  /** Tools available to the agent. */
  tools?: ToolSet;
  /** Maximum number of steps the agent can take per turn. Default: 10. */
  maxSteps?: number;
  /** Custom stop condition. Overrides maxSteps if provided. */
  stopWhen?: StopCondition<ToolSet> | Array<StopCondition<ToolSet>>;

  // --- Planning & Guardrails ---

  /**
   * Called before each step. Use to dynamically change the model, tools,
   * system prompt, or active tools per step — enabling planning (e.g. "think
   * first, then act") and guardrails (e.g. restrict tools after step N).
   */
  prepareStep?: PrepareStepFunction<ToolSet>;

  // --- Error Recovery ---

  /**
   * Called when a tool call fails to parse (wrong name or invalid input).
   * Return a repaired tool call to retry, or null to skip.
   * Enables self-healing agents that recover from malformed tool calls.
   */
  repairToolCall?: ToolCallRepairFunction<ToolSet>;

  // --- Guardrails via Middleware ---

  /**
   * Language model middleware applied to every request. Use for content
   * filtering, logging, rate-limiting, or safety guardrails.
   * Accepts a single middleware or an array (applied in order).
   */
  middleware?: LanguageModelMiddleware | LanguageModelMiddleware[];

  // --- Memory / Context ---

  /**
   * Initial context object shared across all steps. Accessible and mutable
   * in `prepareStep` and tool `execute` functions via `experimental_context`.
   * Use for in-turn memory, accumulating state, or passing data between tools.
   */
  context?: unknown;

  /**
   * Memory adapter for cross-session message persistence.
   * When provided, the handler loads previous messages before each turn
   * and saves the updated messages after the agent finishes.
   * Use `createMemoryAdapter()` for development or implement `AgentMemoryAdapter`
   * for production storage (database, Redis, etc.).
   */
  memory?: AgentMemoryAdapter;

  // --- Callbacks ---

  /** Callback fired after each agent step completes. */
  onStepFinish?: (stepResult: unknown) => Promise<void> | void;
  /** Callback fired when the agent finishes. */
  onFinish?: (event: unknown) => Promise<void> | void;
}

interface AgentRequestBody {
  messages: unknown[];
  model?: string;
  provider?: AllemProviderName;
  systemPrompt?: string;
  sessionId?: string;
}

export function createAllemAgentHandler(config: AllemAgentHandlerConfig) {
  const {
    providers,
    defaultProvider = "google",
    defaultModel,
    systemPrompt: defaultSystemPrompt,
    tools,
    maxSteps = 10,
    stopWhen,
    prepareStep,
    repairToolCall,
    middleware,
    context,
    memory,
    onStepFinish,
    onFinish,
  } = config;

  return async function handler(req: Request): Promise<Response> {
    const body = (await req.json()) as AgentRequestBody;

    const providerName = body.provider ?? defaultProvider;
    const modelId = body.model ?? defaultModel;
    const system = body.systemPrompt ?? defaultSystemPrompt;

    const providerFactory = providers[providerName];
    if (!providerFactory) {
      return new Response(
        JSON.stringify({ error: `Provider "${providerName}" is not configured.` }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const baseModel = providerFactory(modelId);

    // Apply middleware guardrails if configured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- wrapLanguageModel expects LanguageModelV3; provider factories always return model objects
    const model = middleware
      ? wrapLanguageModel({ model: baseModel as any, middleware })
      : baseModel;

    // Load persisted messages and merge with incoming
    let uiMessages = body.messages;
    const sessionId = body.sessionId;

    if (memory && sessionId) {
      const persisted = await memory.load(sessionId);
      if (persisted.length > 0) {
        // Prepend persisted history before current messages
        uiMessages = [...persisted, ...body.messages];
      }
    }

    const agent = new ToolLoopAgent({
      model,
      instructions: system,
      tools,
      stopWhen: stopWhen ?? stepCountIs(maxSteps),
      prepareStep,
      experimental_repairToolCall: repairToolCall,
      experimental_context: context,
      onStepFinish,
      onFinish: async (event) => {
        // Persist messages after turn completes
        if (memory && sessionId) {
          await memory.save(sessionId, uiMessages);
        }
        await onFinish?.(event);
      },
    });

    return createAgentUIStreamResponse({
      agent,
      uiMessages,
      onStepFinish,
    });
  };
}
