import { PropsTable } from "@/components/PropsTable";

const props = [
  { name: "api", type: "string", default: '"/api/chat"', description: "API endpoint for chat requests" },
  { name: "provider", type: '"google" | "anthropic" | "openai"', description: "Default provider name" },
  { name: "model", type: "string", description: "Default model identifier" },
  { name: "headers", type: "Record<string, string>", description: "Default headers for requests" },
];

export default function AllemAIProviderPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AllemAIProvider</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Context provider for default AI configuration. Wrap your app to avoid passing api, provider, and model to every hook call.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { AllemAIProvider } from "@allem-sdk/ai";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Props</h2>
      <div className="mt-4">
        <PropsTable props={props} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`<AllemAIProvider
  api="/api/chat"
  provider="google"
  model="gemini-2.0-flash"
>
  <App />
</AllemAIProvider>`}</pre>
      </div>
    </div>
  );
}
