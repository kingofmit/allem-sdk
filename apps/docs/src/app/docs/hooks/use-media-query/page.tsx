import { PropsTable } from "@/components/PropsTable";

const params = [
  { name: "query", type: "string", required: true, description: "CSS media query string" },
];

export default function UseMediaQueryPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useMediaQuery</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Track CSS media query matches reactively. SSR-safe — returns <code className="font-mono text-sm">false</code> during server rendering.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useMediaQuery } from "@allem-sdk/hooks";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Parameters</h2>
      <div className="mt-4">
        <PropsTable props={params} />
      </div>

      <h2 className="mt-12 text-xl font-semibold">Returns</h2>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">boolean</code> — Whether the media query matches.
      </p>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const isMobile = useMediaQuery("(max-width: 768px)");
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

return isMobile ? <MobileNav /> : <DesktopNav />;`}</pre>
      </div>
    </div>
  );
}
