export default function UseFormPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useForm</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Full form management hook with validation, error tracking, and submit handling.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useForm, required, email } from "@allem-sdk/forms";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Config</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Pass an object where each key is a field name. Each field takes:
      </p>
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
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">initialValue</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">T</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Initial value for the field</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">rules</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">ValidationRule[]</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Array of validation rules</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Return value</h2>
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
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">values</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">T</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Current form values</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">errors</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'Partial<Record<keyof T, string>>'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Validation errors per field</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">touched</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'Partial<Record<keyof T, boolean>>'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Which fields have been blurred</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">isValid</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">True when no errors</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">isSubmitting</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">True during async submit</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">setValue</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">(field, value) =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Set a field value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">setTouched</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">(field) =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Mark field as touched</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">validate</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; boolean</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Validate all fields</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">handleSubmit</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">(onSubmit) =&gt; handler</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Returns form submit handler</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">reset</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">() =&gt; void</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Reset to initial values</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">getFieldProps</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">(field) =&gt; props</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Returns value, onChange, onBlur, name</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const form = useForm({
  name: { initialValue: "", rules: [required()] },
  email: { initialValue: "", rules: [required(), email()] },
  age: { initialValue: 0, rules: [min(18, "Must be 18+")] },
});

const onSubmit = async (values) => {
  await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(values),
  });
};

<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.getFieldProps("name")} />
  {form.touched.name && form.errors.name && (
    <span>{form.errors.name}</span>
  )}

  <input {...form.getFieldProps("email")} />
  <input type="number" {...form.getFieldProps("age")} />

  <button type="submit" disabled={form.isSubmitting}>
    Send
  </button>
  <button type="button" onClick={form.reset}>Reset</button>
</form>`}</pre>
      </div>
    </div>
  );
}
