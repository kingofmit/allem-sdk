import {
  streamText,
  convertToModelMessages,
  type LanguageModel,
  type ToolSet,
  type UIMessage,
} from "ai";

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
}

interface AgentRequestBody {
  messages: UIMessage[];
  model?: string;
  provider?: AllemProviderName;
  systemPrompt?: string;
}

export function createAllemAgentHandler(config: AllemAgentHandlerConfig) {
  const {
    providers,
    defaultProvider = "google",
    defaultModel,
    systemPrompt: defaultSystemPrompt,
    tools,
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
