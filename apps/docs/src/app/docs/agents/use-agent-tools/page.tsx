export default function UseAgentToolsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useAgentTools</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Read registered tool metadata from the nearest AgentProvider. Returns an array of tool registrations with name and description.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useAgentTools } from "@allem-sdk/agents";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr>
              <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">AgentToolRegistration[]</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Array of registered tools with name and optional description</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`import { useAgentTools, useAllemAgent } from "@allem-sdk/agents";

function AgentUI() {
  const tools = useAgentTools();
  const { currentToolCalls } = useAllemAgent();

  return (
    <div>
      <h3>Available tools:</h3>
      <ul>
        {tools.map((t) => (
          <li key={t.name}>
            {t.name}
            {currentToolCalls.some((c) => c.toolName === t.name) && " (running)"}
          </li>
        ))}
      </ul>
    </div>
  );
}`}</pre>
      </div>
    </div>
  );
}
