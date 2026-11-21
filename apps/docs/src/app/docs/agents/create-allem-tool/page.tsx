import { PropsTable } from "@/components/PropsTable";

const options = [
  { name: "description", type: "string", required: true, description: "Human-readable description of what the tool does" },
  { name: "parameters", type: "z.ZodType", required: true, description: "Zod schema defining the tool's input parameters" },
  { name: "execute", type: "(params) => Promise<unknown>", required: true, description: "Async function that runs when the tool is called" },
];

export default function CreateAllemToolPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">createAllemTool</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Typed tool definition helper. Define tools with zod schemas and pass them to createAllemAgentHandler.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { createAllemTool } from "@allem-sdk/agents";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Options</h2>
      <div className="mt-4">
        <PropsTable props={options} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`import { createAllemTool } from "@allem-sdk/agents";
import { z } from "zod";

const searchTool = createAllemTool({
  description: "Search the web for information",
  parameters: z.object({
    query: z.string().describe("The search query"),
    limit: z.number().optional().describe("Max results"),
  }),
  execute: async ({ query, limit = 5 }) => {
    const results = await searchAPI(query, limit);
    return results;
  },
});

// Pass to your agent handler
createAllemAgentHandler({
  providers: { google: (model) => google(model ?? "gemini-2.0-flash") },
  tools: { search: searchTool },
});`}</pre>
      </div>
    </div>
  );
}
