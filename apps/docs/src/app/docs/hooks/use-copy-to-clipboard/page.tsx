export default function UseCopyToClipboardPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useCopyToClipboard</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Copy text to the clipboard with a success state that automatically resets.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useCopyToClipboard } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
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
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">copied</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">True for 2 seconds after a successful copy</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">copy</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">(text: string) =&gt; Promise&lt;void&gt;</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Copy text to clipboard</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const { copied, copy } = useCopyToClipboard();

<button onClick={() => copy("npm install allem-sdk")}>
  {copied ? "Copied!" : "Copy"}
</button>`}</pre>
      </div>
    </div>
  );
}
