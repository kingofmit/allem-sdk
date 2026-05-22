import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "ref", type: "RefObject<Element>", required: true, description: "Ref to the element to observe" },
  { name: "options.threshold", type: "number", default: "0", description: "Visibility threshold (0-1)" },
  { name: "options.root", type: "Element | null", default: "null", description: "Scrollable ancestor" },
  { name: "options.rootMargin", type: "string", default: '"0px"', description: "Margin around root" },
];

export default function UseIntersectionObserverPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useIntersectionObserver</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Observe element visibility in the viewport. Great for lazy loading, infinite scroll, and scroll animations.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useIntersectionObserver } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">boolean</code> — Whether the element is intersecting the viewport.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const ref = useRef<HTMLDivElement>(null);
const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });

<div ref={ref} className={isVisible ? "animate-in" : "opacity-0"}>
  Content appears when scrolled into view
</div>`}</pre>
      </div>
    </div>
  );
}
