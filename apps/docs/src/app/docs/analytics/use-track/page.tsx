export default function UseTrackPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">useTrack</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Returns a <code className="font-mono text-sm">track(event, properties?)</code> function that sends to all adapters.
      </p>

      <div className="mt-8 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <code className="text-sm text-neutral-100">{`import { useTrack } from "@allem-sdk/analytics";`}</code>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Usage</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`const track = useTrack();

<button onClick={() => track("Add to Cart", {
  productId: "123",
  price: 29.99,
})}>
  Add to Cart
</button>`}</pre>
      </div>
    </div>
  );
}
