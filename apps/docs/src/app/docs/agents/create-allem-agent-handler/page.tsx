import { PropsTable } from "@/components/PropsTable";

const options = [
  { name: "providers", type: "Record<string, (modelId?) => LanguageModel>", required: true, description: "Provider factory map" },
  { name: "defaultProvider", type: "string", default: '"google"', description: "Default provider name" },
  { name: "defaultModel", type: "string", description: "Default model ID" },
  { name: "systemPrompt", type: "string", description: "Default system prompt" },
  { name: "tools", type: "ToolSet", description: "Tools available to the agent" },
];

export default function CreateAllemAgentHandlerPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">createAllemAgentHandler</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Server-side request handler for agentic workflows with tool calling. Works with Next.js App Router, Remix, and any Web Request/Response framework.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { createAllemAgentHandler } from "@allem-sdk/agents";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Options</h2>
      <div className="mt-4">
        <PropsTable props={options} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// app/api/agent/route.ts
import { createAllemAgentHandler, createAllemTool } from "@allem-sdk/agents";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const weatherTool = createAllemTool({
  description: "Get the current weather for a location",
  parameters: z.object({ city: z.string() }),
  execute: async ({ city }) => {
    return { city, temperature: 72, condition: "sunny" };
  },
});

export const POST = createAllemAgentHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
  },
  tools: { weather: weatherTool },
});`}</pre>
      </div>

      <div className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">
          Environment variables
        </h3>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
          Set <code className="font-mono">GOOGLE_GENERATIVE_AI_API_KEY</code>,{" "}
          <code className="font-mono">ANTHROPIC_API_KEY</code>, or{" "}
          <code className="font-mono">OPENAI_API_KEY</code> in your{" "}
          <code className="font-mono">.env.local</code> file.
        </p>
      </div>
    </div>
  );
}
