import {
  streamText,
  convertToModelMessages,
  type LanguageModel,
  type ToolSet,
  type UIMessage,
} from "ai";

export type AllemProviderName = "google" | "anthropic" | "openai";

export interface AllemChatHandlerConfig {
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
  /** Tools available to the model. */
  tools?: ToolSet;
}

interface ChatRequestBody {
  messages: UIMessage[];
  model?: string;
  provider?: AllemProviderName;
  systemPrompt?: string;
}

/**
 * Creates an API route handler for AI chat.
 * Works with Next.js App Router, Remix, and any framework that uses
 * the Web Request/Response API.
 *
 * @example
 * ```ts
 * // app/api/chat/route.ts (Next.js)
 * import { createAllemChatHandler } from "@allem-sdk/ai";
 * import { google } from "@ai-sdk/google";
 * import { anthropic } from "@ai-sdk/anthropic";
 *
 * export const POST = createAllemChatHandler({
 *   providers: {
 *     google: (model) => google(model ?? "gemini-2.0-flash"),
 *     anthropic: (model) => anthropic(model ?? "claude-sonnet-4-20250514"),
 *   },
 * });
 * ```
 */
export function createAllemChatHandler(config: AllemChatHandlerConfig) {
  const {
    providers,
    defaultProvider = "google",
    defaultModel,
    systemPrompt: defaultSystemPrompt,
    tools,
  } = config;

  return async function handler(req: Request): Promise<Response> {
    const body = (await req.json()) as ChatRequestBody;

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

    const model = providerFactory(modelId);
    const modelMessages = await convertToModelMessages(body.messages);

    const result = streamText({
      model,
      system,
      messages: modelMessages,
      tools,
    });

    return result.toUIMessageStreamResponse();
  };
}
