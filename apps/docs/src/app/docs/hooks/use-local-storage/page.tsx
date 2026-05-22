import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "key", type: "string", required: true, description: "The localStorage key" },
  { name: "initialValue", type: "T", required: true, description: "Default value if key doesn't exist" },
];

export default function UseLocalStoragePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useLocalStorage</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Persist state in localStorage with automatic JSON serialization. SSR-safe — returns the initial value during server rendering.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useLocalStorage } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">[T, (value: T) =&gt; void]</code> — A stateful value and setter, like <code className="font-mono text-sm">useState</code>.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const [theme, setTheme] = useLocalStorage("theme", "light");

<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
  Current: {theme}
</button>`}</pre>
      </div>
    </div>
  );
}
