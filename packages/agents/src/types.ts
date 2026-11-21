export type AgentStatus = "idle" | "thinking" | "calling-tool" | "done";

export interface AgentToolCall {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
}

export interface AgentStep {
  stepIndex: number;
  toolCalls: AgentToolCall[];
  startedAt: number;
}

export interface AgentToolRegistration {
  name: string;
  description?: string;
}
