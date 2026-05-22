export default function ValidatorsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Validators</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Built-in validation rules for use with <code className="font-mono text-sm">useForm</code> and <code className="font-mono text-sm">useField</code>. All accept an optional custom error message.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`import {
  required, minLength, maxLength,
  pattern, min, max, email, url, custom
} from "@allem-sdk/forms";`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Available validators</h2>
      <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Validator</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Signature</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">required</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">required(msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Field must not be empty</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">minLength</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">minLength(n, msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Minimum string length</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">maxLength</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">maxLength(n, msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Maximum string length</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">min</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">min(n, msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Minimum numeric value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">max</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">max(n, msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Maximum numeric value</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">pattern</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">pattern(regex, msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Must match regex</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">email</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">email(msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Valid email format</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">url</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">url(msg?)</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Valid URL (http/https)</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">custom</td><td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{'custom(fn)'}</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Custom validation function</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Custom validator</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const passwordStrength = custom<string>((value) => {
  if (value.length < 8) return "Must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
  if (!/[0-9]/.test(value)) return "Must contain a number";
  return undefined; // valid
});

const form = useForm({
  password: {
    initialValue: "",
    rules: [required(), passwordStrength],
  },
});`}</pre>
      </div>
    </div>
  );
}
