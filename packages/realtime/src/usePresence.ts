import { useState, useEffect } from "react";
import { useRealtimeAdapter, type PresenceMember } from "./RealtimeProvider";

/**
 * Track who is present on a channel. Joins with the given info
 * and returns the current list of members.
 *
 * @example
 * ```tsx
 * const members = usePresence("room-1", { name: "Ahmed", avatar: "/me.png" });
 * // members = [{ id: "...", info: { name: "Ahmed", ... }, joinedAt: ... }]
 * ```
 */
export function usePresence(
  channel: string,
  info: Record<string, unknown> = {},
): PresenceMember[] {
  const adapter = useRealtimeAdapter();
  const [members, setMembers] = useState<PresenceMember[]>([]);

  useEffect(() => {
    if (!adapter.subscribePresence) return;

    adapter.enterPresence?.(channel, info);
    const unsubscribe = adapter.subscribePresence(channel, setMembers);

    return () => {
      adapter.leavePresence?.(channel);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adapter, channel]);

  return members;
}
