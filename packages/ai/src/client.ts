// Client hooks
export { useAllemChat, type UseAllemChatOptions, type AllemProvider } from "./useAllemChat";
export { useAllemCompletion, type UseAllemCompletionOptions } from "./useAllemCompletion";
export { AllemAIProvider, useAllemAIConfig, type AllemAIConfig, type AllemAIProviderProps } from "./AllemAIProvider";

// Re-export useful types from AI SDK
export type { UIMessage } from "ai";
export type { UseChatHelpers, UseCompletionHelpers } from "@ai-sdk/react";
