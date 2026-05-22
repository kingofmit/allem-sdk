import Link from "next/link";

const exports = [
  { name: "useAllemAgent", description: "Agent hook with status tracking, step history, and tool call awareness", href: "/docs/agents/use-allem-agent" },
  { name: "AgentProvider", description: "Optional context for registering tool metadata for UI display", href: "/docs/agents/agent-provider" },
  { name: "useAgentTools", description: "Read registered tool metadata from AgentProvider", href: "/docs/agents/use-agent-tools" },
  { name: "createAllemAgentHandler", description: "Server-side request handler with tool calling for agentic workflows", href: "/docs/agents/create-allem-agent-handler" },
  { name: "createAllemTool", description: "Typed tool definition helper with zod schema validation", href: "/docs/agents/create-allem-tool" },
];

export default function AgentsOverviewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Agentic AI hooks for React. Multi-step tool calling, agent status tracking, and typed tool definitions built on the Vercel AI SDK.
      </p>

      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`npm install @allem-sdk/agents @allem-sdk/ai ai @ai-sdk/react

# Pick your provider(s)
npm install @ai-sdk/google @ai-sdk/anthropic @ai-sdk/openai

# For defining tools with schemas
npm install zod`}</pre>
      </div>

      <div className="mt-12 grid gap-3">
        {exports.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center justify-between rounded-lg border border-neutral-200 px-5 py-4 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-neutral-800 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30"
          >
            <div>
              <span className="font-mono text-sm font-medium text-indigo-600 dark:text-indigo-400">{item.name}</span>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
