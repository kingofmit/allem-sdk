import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "name", type: "string", required: true, description: "Page name" },
  { name: "properties", type: "Record<string, unknown>", description: "Optional properties" },
];

export default function UsePageViewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">usePageView</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Tracks a page view on mount. Calls <code className="font-mono text-sm">adapter.page()</code> for all adapters.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { usePageView } from "@allem-sdk/analytics";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// At the top of page components
usePageView("Product Page", { productId: "123" });`}</pre>
      </div>
    </div>
  );
}
