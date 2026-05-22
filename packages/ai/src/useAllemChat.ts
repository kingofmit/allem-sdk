import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage, type ChatInit } from "ai";
import { useAllemAIConfig } from "./AllemAIProvider";

export type AllemProvider = "google" | "anthropic" | "openai";

export interface UseAllemChatOptions
  extends Omit<ChatInit<UIMessage>, "transport"> {
  /** Override the API endpoint from AllemAIProvider. */
  api?: string;
  /** Model identifier sent in the request body (e.g. "gemini-2.0-flash"). */
  model?: string;
  /** Provider name sent in the request body. */
  provider?: AllemProvider;
  /** System prompt sent in the request body. */
  systemPrompt?: string;
  /** Extra headers merged with AllemAIProvider headers. */
  headers?: Record<string, string>;
  /** Custom throttle wait in ms for updates. */
  experimental_throttle?: number;
}

export function useAllemChat(
  options: UseAllemChatOptions = {},
): UseChatHelpers<UIMessage> {
  const config = useAllemAIConfig();

  const {
    api,
    model,
    provider,
    systemPrompt,
    headers,
    experimental_throttle,
    ...restOptions
  } = options;

  const resolvedApi = api ?? config.api;
  const resolvedModel = model ?? config.model;
  const resolvedProvider = provider ?? config.provider;
  const resolvedHeaders = { ...config.headers, ...headers };

  const transport = new DefaultChatTransport({
    api: resolvedApi,
    headers: resolvedHeaders,
    body: {
      ...(resolvedModel && { model: resolvedModel }),
      ...(resolvedProvider && { provider: resolvedProvider }),
      ...(systemPrompt && { systemPrompt }),
    },
  });

  return useChat({
    transport,
    experimental_throttle,
    ...restOptions,
  });
}
