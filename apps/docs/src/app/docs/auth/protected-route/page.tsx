import { PropsTable } from "@/components/PropsTable";

const props = [
  { name: "children", type: "ReactNode", required: true, description: "Content to show when authenticated" },
  { name: "fallback", type: "ReactNode", required: true, description: "Content to show when not authenticated" },
  { name: "loadingFallback", type: "ReactNode", description: "Content to show while loading" },
];

export default function ProtectedRoutePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">ProtectedRoute</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Renders children only when authenticated. Shows fallback otherwise.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { ProtectedRoute } from "@allem-sdk/auth";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Props</h2>
      <div className="mt-4">
        <PropsTable props={props} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`<ProtectedRoute
  fallback={<LoginPage />}
  loadingFallback={<Spinner />}
>
  <Dashboard />
</ProtectedRoute>`}</pre>
      </div>

      <div className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-800 dark:bg-indigo-950/30">
        <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">
          Tip
        </h3>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
          <code className="font-mono">ProtectedRoute</code> is a convenience wrapper. For more control over auth state, use{" "}
          <code className="font-mono">useAuth()</code> directly in your components.
        </p>
      </div>
    </div>
  );
}
