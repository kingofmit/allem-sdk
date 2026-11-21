import { createContext, useContext, type ReactNode } from "react";
import type { AgentToolRegistration } from "./types";

interface AgentContextValue {
  tools: AgentToolRegistration[];
}

const AgentContext = createContext<AgentContextValue>({ tools: [] });

export interface AgentProviderProps {
  /** Tool metadata for client-side display (names and descriptions). */
  tools?: AgentToolRegistration[];
  children: ReactNode;
}

export function AgentProvider({ tools = [], children }: AgentProviderProps) {
  return (
    <AgentContext.Provider value={{ tools }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentTools(): AgentToolRegistration[] {
  return useContext(AgentContext).tools;
}
