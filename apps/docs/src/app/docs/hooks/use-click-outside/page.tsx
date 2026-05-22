import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "ref", type: "RefObject<HTMLElement>", required: true, description: "Ref to the element to watch" },
  { name: "handler", type: "() => void", required: true, description: "Callback when clicked outside" },
];

export default function UseClickOutsidePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useClickOutside</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Detect clicks outside a referenced element. Perfect for closing dropdowns, modals, and popovers.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useClickOutside } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const ref = useRef<HTMLDivElement>(null);
const [isOpen, setIsOpen] = useState(false);

useClickOutside(ref, () => setIsOpen(false));

<div ref={ref}>
  {isOpen && <DropdownMenu />}
</div>`}</pre>
      </div>
    </div>
  );
}
