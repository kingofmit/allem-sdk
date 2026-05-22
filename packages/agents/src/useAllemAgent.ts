import { useMemo } from "react";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage, type ChatInit } from "ai";
import { useAllemAIConfig } from "@allem-sdk/ai";
import type { AgentStatus, AgentStep, AgentToolCall } from "./types";

export type AllemProvider = "google" | "anthropic" | "openai";

export interface UseAllemAgentOptions
  extends Omit<ChatInit<UIMessage>, "transport"> {
  /** Override the API endpoint from AllemAIProvider. */
  api?: string;
  /** Model identifier sent in the request body. */
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

export interface UseAllemAgentReturn extends UseChatHelpers<UIMessage> {
  /** Current agent lifecycle status. */
  agentStatus: AgentStatus;
  /** Ordered list of steps taken in the current turn. */
  steps: AgentStep[];
  /** The tool calls from the most recent step, if any. */
  currentToolCalls: AgentToolCall[];
  /** Whether the agent is actively processing. */
  isAgentRunning: boolean;
}

type ChatStatus = "submitted" | "streaming" | "ready" | "error";

function deriveAgentState(messages: UIMessage[], chatStatus: ChatStatus) {
  const steps: AgentStep[] = [];
  const allToolCalls: AgentToolCall[] = [];
  let stepIndex = 0;
  const isActive = chatStatus === "submitted" || chatStatus === "streaming";

  for (const msg of messages) {
    if (msg.role !== "assistant" || !msg.parts) continue;

    const stepToolCalls: AgentToolCall[] = [];

    for (const part of msg.parts) {
      if (part.type === "tool-invocation") {
        const invocation = part as unknown as {
          toolInvocationId: string;
          toolName: string;
          args: Record<string, unknown>;
        };
        stepToolCalls.push({
          toolCallId: invocation.toolInvocationId,
          toolName: invocation.toolName,
          args: invocation.args,
        });
      }
    }

    if (stepToolCalls.length > 0) {
      steps.push({
        stepIndex,
        toolCalls: stepToolCalls,
        startedAt: Date.now(),
      });
      stepIndex++;
      allToolCalls.push(...stepToolCalls);
    }
  }

  const lastMsg = messages[messages.length - 1];
  const hasToolCalls = allToolCalls.length > 0;
  const lastIsAssistantText =
    lastMsg?.role === "assistant" &&
    lastMsg.parts?.some((p) => p.type === "text");

  let agentStatus: AgentStatus;
  if (!isActive && messages.length === 0) {
    agentStatus = "idle";
  } else if (isActive && hasToolCalls && !lastIsAssistantText) {
    agentStatus = "calling-tool";
  } else if (isActive) {
    agentStatus = "thinking";
  } else if (messages.length > 0) {
    agentStatus = "done";
  } else {
    agentStatus = "idle";
  }

  const currentToolCalls =
    steps.length > 0 ? steps[steps.length - 1].toolCalls : [];

  return { agentStatus, steps, currentToolCalls, isAgentRunning: isActive };
}

export function useAllemAgent(
  options: UseAllemAgentOptions = {},
): UseAllemAgentReturn {
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

  const chatHelpers = useChat({
    transport,
    experimental_throttle,
    ...restOptions,
  });

  const { agentStatus, steps, currentToolCalls, isAgentRunning } = useMemo(
    () => deriveAgentState(chatHelpers.messages, chatHelpers.status as ChatStatus),
    [chatHelpers.messages, chatHelpers.status],
  );

  return {
    ...chatHelpers,
    agentStatus,
    steps,
    currentToolCalls,
    isAgentRunning,
  };
}
