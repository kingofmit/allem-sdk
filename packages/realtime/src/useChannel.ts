import { useEffect, useCallback } from "react";
import { useRealtimeAdapter } from "./RealtimeProvider";

/**
 * Subscribe to a realtime channel. Messages are delivered to the callback.
 * Returns a `publish` function to send messages to the same channel.
 *
 * @example
 * ```tsx
 * const { publish } = useChannel("chat-room", (message) => {
 *   setMessages((prev) => [...prev, message]);
 * });
 *
 * publish({ text: "Hello!" });
 * ```
 */
export function useChannel(
  channel: string,
  onMessage: (data: unknown) => void,
): { publish: (data: unknown) => void } {
  const adapter = useRealtimeAdapter();

  useEffect(() => {
    const unsubscribe = adapter.subscribe(channel, onMessage);
    return unsubscribe;
  }, [adapter, channel, onMessage]);

  const publish = useCallback(
    (data: unknown) => adapter.publish(channel, data),
    [adapter, channel],
  );

  return { publish };
}
