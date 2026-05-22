export default function UseFieldPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useField</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Standalone single-field hook with validation. Useful when you need validation on a single input without a full form.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useField, required, email } from "@allem-sdk/forms";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const emailField = useField({
  initialValue: "",
  rules: [required(), email()],
});

<input
  value={emailField.value}
  onChange={(e) => emailField.setValue(e.target.value)}
  onBlur={emailField.onBlur}
/>
{emailField.touched && emailField.error && (
  <span>{emailField.error}</span>
)}`}</pre>
      </div>
    </div>
  );
}
