import { PropsTable } from "@/components/PropsTable";

const options = [
  { name: "api", type: "string", description: "Override API endpoint from AllemAIProvider" },
  { name: "model", type: "string", description: 'Model identifier (e.g. "gemini-2.0-flash")' },
  { name: "provider", type: '"google" | "anthropic" | "openai"', description: "Provider name" },
  { name: "systemPrompt", type: "string", description: "System prompt sent with requests" },
  { name: "headers", type: "Record<string, string>", description: "Extra headers merged with provider headers" },
  { name: "experimental_throttle", type: "number", description: "Throttle wait in ms for updates" },
];

export default function UseAllemAgentPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useAllemAgent</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Agent hook with status tracking, step history, and tool call awareness. Built on the Vercel AI SDK.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useAllemAgent } from "@allem-sdk/agents";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Options</h2>
      <div className="mt-4">
        <PropsTable props={options} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        All properties from <code className="font-mono text-xs">UseChatHelpers</code>, plus:
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Property</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">agentStatus</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">AgentStatus</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{"\"idle\" | \"thinking\" | \"calling-tool\" | \"done\""}</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">steps</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">AgentStep[]</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Ordered list of steps taken in the current turn</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">currentToolCalls</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">AgentToolCall[]</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Tool calls from the most recent step</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">isAgentRunning</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Whether the agent is actively processing</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">messages</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">UIMessage[]</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Array of chat messages</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">sendMessage</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">({'{ text }'}): Promise</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Send a message to the agent</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">status</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'"ready" | "submitted" | "streaming"'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Underlying chat status</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">stop</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Stop the agent</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`import { AllemAIProvider } from "@allem-sdk/ai";
import { useAllemAgent } from "@allem-sdk/agents";

function App() {
  return (
    <AllemAIProvider api="/api/agent" provider="google">
      <Agent />
    </AllemAIProvider>
  );
}

function Agent() {
  const {
    messages,
    sendMessage,
    agentStatus,
    steps,
    currentToolCalls,
    isAgentRunning,
  } = useAllemAgent();

  return (
    <div>
      {agentStatus === "calling-tool" && (
        <p>Using tool: {currentToolCalls[0]?.toolName}</p>
      )}
      {messages.map((m) => (
        <div key={m.id}>
          {m.parts?.filter((p) => p.type === "text").map((p) => p.text).join("")}
        </div>
      ))}
      <p>Steps taken: {steps.length}</p>
    </div>
  );
}`}</pre>
      </div>
    </div>
  );
}
