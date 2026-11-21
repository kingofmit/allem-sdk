import type { z } from "zod";

export interface AllemToolConfig<TParams extends z.ZodType> {
  description: string;
  parameters: TParams;
  execute: (params: z.infer<TParams>) => Promise<unknown>;
}

/**
 * Creates a tool definition compatible with Vercel AI SDK's streamText tools.
 *
 * @example
 * ```ts
 * const weather = createAllemTool({
 *   description: "Get the weather for a city",
 *   parameters: z.object({ city: z.string() }),
 *   execute: async ({ city }) => ({ temp: 72 }),
 * });
 *
 * createAllemAgentHandler({ tools: { weather }, ... });
 * ```
 */
export function createAllemTool<TParams extends z.ZodType>(
  config: AllemToolConfig<TParams>,
) {
  return {
    description: config.description,
    parameters: config.parameters,
    execute: config.execute,
  };
}
