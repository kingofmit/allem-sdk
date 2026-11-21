import type { PrepareStepFunction, ToolSet } from "ai";

/**
 * "Think then Act" pattern.
 * Step 0: Forces the model to reason without tools (toolChoice: "none").
 * Step 1+: Enables all tools with auto choice.
 *
 * @example
 * ```ts
 * createAllemAgentHandler({
 *   prepareStep: thinkThenAct(),
 *   // ...
 * });
 * ```
 */
export function thinkThenAct(options?: {
  /** System prompt override for the thinking step. */
  thinkingPrompt?: string;
}): PrepareStepFunction<ToolSet> {
  return ({ stepNumber }) => {
    if (stepNumber === 0) {
      return {
        toolChoice: "none" as const,
        ...(options?.thinkingPrompt && { system: options.thinkingPrompt }),
      };
    }
    return { toolChoice: "auto" as const };
  };
}

/**
 * "Plan, Execute, Verify" pattern.
 * Step 0: Plan — no tools, model creates a plan.
 * Steps 1 to N-1: Execute — tools enabled.
 * Step N: Verify — no tools, model summarizes and verifies results.
 *
 * @param verifyAtStep - The step number at which to switch to verify mode. Default: the last step before stopping.
 *
 * @example
 * ```ts
 * createAllemAgentHandler({
 *   prepareStep: planExecuteVerify({ verifyAtStep: 5 }),
 *   maxSteps: 6,
 *   // ...
 * });
 * ```
 */
export function planExecuteVerify(options?: {
  /** The step number at which to run the verify phase. */
  verifyAtStep?: number;
  /** System prompt for the planning step. */
  planPrompt?: string;
  /** System prompt for the verify step. */
  verifyPrompt?: string;
}): PrepareStepFunction<ToolSet> {
  const verifyAt = options?.verifyAtStep ?? 5;

  return ({ stepNumber }) => {
    if (stepNumber === 0) {
      return {
        toolChoice: "none" as const,
        ...(options?.planPrompt && { system: options.planPrompt }),
      };
    }
    if (stepNumber >= verifyAt) {
      return {
        toolChoice: "none" as const,
        ...(options?.verifyPrompt && {
          system:
            options.verifyPrompt ??
            "Review the results of the previous steps. Summarize what was accomplished and flag any issues.",
        }),
      };
    }
    return { toolChoice: "auto" as const };
  };
}

/**
 * "Restrict After" pattern.
 * After a certain step, restricts the agent to a subset of tools.
 * Useful for guardrails — e.g., allow search early on, but only
 * allow "respond" after step 3.
 *
 * @example
 * ```ts
 * createAllemAgentHandler({
 *   prepareStep: restrictAfter(3, ["respond"]),
 *   tools: { search, calculate, respond },
 *   // ...
 * });
 * ```
 */
export function restrictAfter(
  afterStep: number,
  allowedTools: string[],
): PrepareStepFunction<ToolSet> {
  return ({ stepNumber }) => {
    if (stepNumber > afterStep) {
      return { activeTools: allowedTools };
    }
    return undefined;
  };
}
