import { PropsTable } from "@/components/PropsTable";

const props = [
  { name: "tools", type: "AgentToolRegistration[]", description: "Tool metadata for client-side display (names and descriptions)" },
  { name: "children", type: "ReactNode", required: true, description: "Child components" },
];

export default function AgentProviderPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AgentProvider</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Optional context provider for registering tool metadata. Use this to display tool names and descriptions in your UI without exposing server-side tool implementations.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { AgentProvider } from "@allem-sdk/agents";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Props</h2>
      <div className="mt-4">
        <PropsTable props={props} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`import { AgentProvider, useAgentTools } from "@allem-sdk/agents";

const tools = [
  { name: "weather", description: "Get current weather" },
  { name: "search", description: "Search the web" },
];

function App() {
  return (
    <AgentProvider tools={tools}>
      <ToolList />
    </AgentProvider>
  );
}

function ToolList() {
  const tools = useAgentTools();
  return (
    <ul>
      {tools.map((t) => (
        <li key={t.name}>{t.name}: {t.description}</li>
      ))}
    </ul>
  );
}`}</pre>
      </div>
    </div>
  );
}
