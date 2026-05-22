import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "value", type: "T", required: true, description: "The value to debounce" },
  { name: "delay", type: "number", default: "500", description: "Delay in milliseconds" },
];

export default function UseDebouncePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useDebounce</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Debounce any value with a configurable delay. Useful for search inputs, API calls, and filtering.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useDebounce } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">T</code> — The debounced value, updated after the delay.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  if (debouncedSearch) {
    fetchResults(debouncedSearch);
  }
}, [debouncedSearch]);

<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search..."
/>`}</pre>
      </div>
    </div>
  );
}
