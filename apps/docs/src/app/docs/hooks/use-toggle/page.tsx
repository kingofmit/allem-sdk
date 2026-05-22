import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "initialValue", type: "boolean", default: "false", description: "Initial toggle state" },
];

export default function UseTogglePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useToggle</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Boolean state with convenient toggle, on, and off helper functions.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useToggle } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
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
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">value</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current state</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">toggle</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Flip the value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">on</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Set to true</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">off</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Set to false</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const { value: isOpen, toggle, on, off } = useToggle();

<button onClick={toggle}>
  {isOpen ? "Close" : "Open"}
</button>

{isOpen && <Panel onClose={off} />}`}</pre>
      </div>
    </div>
  );
}
