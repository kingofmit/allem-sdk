import Link from "next/link";

const exports = [
  { name: "AllemAIProvider", description: "Context provider for default AI configuration", href: "/docs/ai/allem-ai-provider" },
  { name: "useAllemAIConfig", description: "Access the current provider context values", href: "/docs/ai/use-allem-ai-config" },
  { name: "useAllemChat", description: "Chat hook with streaming, message history, and provider context", href: "/docs/ai/use-allem-chat" },
  { name: "useAllemCompletion", description: "Text completion hook for single-turn prompts", href: "/docs/ai/use-allem-completion" },
  { name: "createAllemChatHandler", description: "Server-side API route handler for chat", href: "/docs/ai/create-allem-chat-handler" },
];

export default function AIOverviewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">AI</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Multi-provider AI hooks built on the Vercel AI SDK. Supports Google Gemini, Anthropic Claude, and OpenAI GPT with streaming out of the box.
      </p>

      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`npm install @allem-sdk/ai ai @ai-sdk/react

# Pick your provider(s)
npm install @ai-sdk/google @ai-sdk/anthropic @ai-sdk/openai`}</pre>
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
