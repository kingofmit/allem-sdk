import { PropsTable } from "@/components/PropsTable";

const options = [
  { name: "api", type: "string", description: "Override API endpoint" },
  { name: "headers", type: "Record<string, string>", description: "Extra headers" },
];

export default function UseAllemCompletionPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useAllemCompletion</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Text completion hook for single-turn prompts. Returns <code className="font-mono text-sm">UseCompletionHelpers</code> from the AI SDK.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useAllemCompletion } from "@allem-sdk/ai";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Options</h2>
      <div className="mt-4">
        <PropsTable props={options} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const { completion, complete, isLoading } = useAllemCompletion();

await complete("Write a haiku about React hooks");

<p>{completion}</p>`}</pre>
      </div>
    </div>
  );
}
