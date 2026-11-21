import type { LanguageModelMiddleware } from "ai";

export interface AllemGuardrailConfig {
  /** Human-readable name for this guardrail (for logging/debugging). */
  name: string;

  /**
   * Called before the model is invoked. Inspect or modify the params.
   * Throw an error to block the request entirely.
   */
  beforeModel?: LanguageModelMiddleware["transformParams"];

  /**
   * Wrap the generate call. Use to inspect/modify the result,
   * add logging, or implement retry logic.
   */
  wrapGenerate?: LanguageModelMiddleware["wrapGenerate"];

  /**
   * Wrap the stream call. Use to inspect/modify streaming results,
   * add logging, or implement content filtering on streams.
   */
  wrapStream?: LanguageModelMiddleware["wrapStream"];
}

/**
 * Creates a guardrail middleware for use with `createAllemAgentHandler`.
 *
 * Guardrails intercept model calls to enforce safety rules, filter content,
 * add logging, or implement custom validation.
 *
 * @example
 * ```ts
 * const noSecrets = createAllemGuardrail({
 *   name: "no-secrets",
 *   beforeModel: async ({ params }) => {
 *     // Block requests that mention API keys
 *     const text = JSON.stringify(params.prompt);
 *     if (/api[_-]?key/i.test(text)) {
 *       throw new Error("Blocked: request contains sensitive content");
 *     }
 *     return params;
 *   },
 * });
 *
 * const logger = createAllemGuardrail({
 *   name: "step-logger",
 *   wrapGenerate: async ({ doGenerate }) => {
 *     const start = Date.now();
 *     const result = await doGenerate();
 *     console.log(`LLM call took ${Date.now() - start}ms`);
 *     return result;
 *   },
 * });
 *
 * createAllemAgentHandler({
 *   middleware: [noSecrets, logger],
 *   // ...
 * });
 * ```
 */
export function createAllemGuardrail(
  config: AllemGuardrailConfig,
): LanguageModelMiddleware {
  return {
    specificationVersion: "v3" as const,
    ...(config.beforeModel && { transformParams: config.beforeModel }),
    ...(config.wrapGenerate && { wrapGenerate: config.wrapGenerate }),
    ...(config.wrapStream && { wrapStream: config.wrapStream }),
  };
}
