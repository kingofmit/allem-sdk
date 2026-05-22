import { createContext, useContext, type ReactNode } from "react";

export interface AllemAIConfig {
  /** API endpoint for chat. Default: "/api/chat" */
  api: string;
  /** Default model identifier (e.g. "gemini-2.0-flash", "claude-sonnet-4-20250514"). */
  model?: string;
  /** Default provider. */
  provider?: "google" | "anthropic" | "openai";
  /** Extra headers sent with every request. */
  headers?: Record<string, string>;
}

const defaults: AllemAIConfig = {
  api: "/api/chat",
  provider: "google",
};

const AllemAIContext = createContext<AllemAIConfig>(defaults);

export interface AllemAIProviderProps extends Partial<AllemAIConfig> {
  children: ReactNode;
}

export function AllemAIProvider({
  children,
  ...config
}: AllemAIProviderProps) {
  const value: AllemAIConfig = { ...defaults, ...config };
  return (
    <AllemAIContext.Provider value={value}>{children}</AllemAIContext.Provider>
  );
}

export function useAllemAIConfig(): AllemAIConfig {
  return useContext(AllemAIContext);
}
