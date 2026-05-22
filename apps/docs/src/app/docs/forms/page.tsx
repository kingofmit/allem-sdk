import Link from "next/link";

const exports = [
  { name: "useForm", description: "Full form management with validation, error tracking, and submit handling", href: "/docs/forms/use-form" },
  { name: "useField", description: "Standalone single-field hook with validation", href: "/docs/forms/use-field" },
  { name: "Validators", description: "Built-in validation rules: required, email, minLength, pattern, and more", href: "/docs/forms/validators" },
];

export default function FormsOverviewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Declarative form management with built-in validation. Zero dependencies, full TypeScript support.
      </p>

      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">npm install @allem-sdk/forms</code>
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
