import {
  useCompletion,
  type UseCompletionOptions,
  type UseCompletionHelpers,
} from "@ai-sdk/react";
import { useAllemAIConfig } from "./AllemAIProvider";

export interface UseAllemCompletionOptions extends UseCompletionOptions {
  /** Override the API endpoint from AllemAIProvider. */
  api?: string;
  /** Extra headers merged with AllemAIProvider headers. */
  headers?: Record<string, string>;
}

export function useAllemCompletion(
  options: UseAllemCompletionOptions = {},
): UseCompletionHelpers {
  const config = useAllemAIConfig();

  const { api, headers, ...restOptions } = options;

  return useCompletion({
    api: api ?? config.api,
    headers: { ...config.headers, ...headers },
    ...restOptions,
  });
}
