interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-3 font-mono text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {prop.name}
                {prop.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-neutral-500 dark:text-neutral-500">
                {prop.default ?? "\u2014"}
              </td>
              <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
