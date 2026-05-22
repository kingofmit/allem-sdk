export default function GettingStartedPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Get up and running with Allem SDK in your React project.
      </p>

      {/* Install */}
      <h2 className="mt-12 text-xl font-semibold">1. Install</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Install the full SDK or just the packages you need:
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`# Everything in one package
npm install allem-sdk

# Or individual packages
npm install @allem-sdk/hooks
npm install @allem-sdk/ai
npm install @allem-sdk/forms
npm install @allem-sdk/analytics
npm install @allem-sdk/auth`}</pre>
      </div>

      {/* AI peer deps */}
      <h2 className="mt-12 text-xl font-semibold">2. AI peer dependencies</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        If you&apos;re using{" "}
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-sm font-mono dark:bg-neutral-800">
          @allem-sdk/ai
        </code>
        , install the Vercel AI SDK and your preferred provider:
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`npm install ai @ai-sdk/react

# Pick your provider(s)
npm install @ai-sdk/google      # Google Gemini
npm install @ai-sdk/anthropic   # Anthropic Claude
npm install @ai-sdk/openai      # OpenAI GPT`}</pre>
      </div>

      {/* Usage */}
      <h2 className="mt-12 text-xl font-semibold">3. Start using</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// Import from individual packages
import { useDebounce, useToggle } from "@allem-sdk/hooks";
import { useForm, required, email } from "@allem-sdk/forms";
import { useAllemChat } from "@allem-sdk/ai";

// Or from the meta-package
import { useDebounce, useForm, useAllemChat } from "allem-sdk";

// Sub-path imports also work
import { useDebounce } from "allem-sdk/hooks";
import { useForm } from "allem-sdk/forms";`}</pre>
      </div>

      {/* Packages */}
      <h2 className="mt-12 text-xl font-semibold">Packages</h2>
      <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Package</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">@allem-sdk/hooks</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">8 essential React hooks</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">@allem-sdk/ai</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">AI chat & completion hooks with multi-provider support</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">@allem-sdk/forms</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Form management with validation</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">@allem-sdk/analytics</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Provider-agnostic analytics</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">@allem-sdk/auth</td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Authentication with session management</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Framework support */}
      <div className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">
          Framework support
        </h3>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
          Allem SDK works with Next.js, Vite, Remix, and any React framework.
          All hooks include the{" "}
          <code className="font-mono">&quot;use client&quot;</code> directive
          and are SSR-safe.
        </p>
      </div>
    </div>
  );
}
