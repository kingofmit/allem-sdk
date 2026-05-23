import { useSyncExternalStore } from "react";
import { useRealtimeAdapter, type ConnectionStatus } from "./RealtimeProvider";

/**
 * Returns the current connection status of the realtime adapter.
 *
 * @example
 * ```tsx
 * const status = useConnectionStatus();
 * // "connecting" | "connected" | "disconnected" | "error"
 * ```
 */
export function useConnectionStatus(): ConnectionStatus {
  const adapter = useRealtimeAdapter();

  return useSyncExternalStore(
    // No native subscribe for status changes — poll on re-render
    (callback) => {
      const interval = setInterval(callback, 1000);
      return () => clearInterval(interval);
    },
    () => adapter.getStatus(),
    () => "disconnected" as ConnectionStatus,
  );
}
