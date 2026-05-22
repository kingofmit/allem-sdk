export default function UseAllemAIConfigPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useAllemAIConfig</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Hook to access the current <code className="font-mono text-sm">AllemAIProvider</code> context values. Useful when you need to read the configured api, provider, model, or headers outside of the chat/completion hooks.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useAllemAIConfig } from "@allem-sdk/ai";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">AllemAIConfig</code> — The current provider context values.
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
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">api</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">string</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current API endpoint</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">provider</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'"google" | "anthropic" | "openai" | undefined'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current provider</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">model</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">string | undefined</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current model identifier</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">headers</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'Record<string, string> | undefined'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current headers</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const config = useAllemAIConfig();

// Use the configured API endpoint for custom requests
const res = await fetch(config.api, {
  method: "POST",
  headers: { ...config.headers, "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Hello" }),
});

// Conditionally render based on provider
if (config.provider === "anthropic") {
  return <AnthropicBadge />;
}`}</pre>
      </div>

      <div className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">
          Tip
        </h3>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
          <code className="font-mono">useAllemChat</code> and{" "}
          <code className="font-mono">useAllemCompletion</code> already read from
          the provider context automatically. Use{" "}
          <code className="font-mono">useAllemAIConfig</code> only when you need
          direct access to the config values.
        </p>
      </div>
    </div>
  );
}
