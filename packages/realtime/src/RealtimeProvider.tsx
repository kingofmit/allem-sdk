import { createContext, useContext, useRef, type ReactNode } from "react";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export interface RealtimeAdapter {
  /** Subscribe to a channel. Returns an unsubscribe function. */
  subscribe(channel: string, callback: (data: unknown) => void): () => void;
  /** Publish a message to a channel. */
  publish(channel: string, data: unknown): void;
  /** Get current connection status. */
  getStatus(): ConnectionStatus;
  /** Subscribe to presence updates on a channel. Returns unsubscribe. */
  subscribePresence?(
    channel: string,
    callback: (members: PresenceMember[]) => void,
  ): () => void;
  /** Join a channel with presence info. */
  enterPresence?(channel: string, info: Record<string, unknown>): void;
  /** Leave presence on a channel. */
  leavePresence?(channel: string): void;
  /** Disconnect from the realtime service. */
  disconnect?(): void;
}

export interface PresenceMember {
  id: string;
  info: Record<string, unknown>;
  joinedAt: number;
}

interface RealtimeContextValue {
  adapter: RealtimeAdapter;
}

const noopAdapter: RealtimeAdapter = {
  subscribe: () => () => {},
  publish: () => {},
  getStatus: () => "disconnected",
};

const RealtimeContext = createContext<RealtimeContextValue>({
  adapter: noopAdapter,
});

export interface RealtimeProviderProps {
  adapter: RealtimeAdapter;
  children: ReactNode;
}

export function RealtimeProvider({ adapter, children }: RealtimeProviderProps) {
  const value = useRef({ adapter }).current;
  return (
    <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
  );
}

export function useRealtimeAdapter(): RealtimeAdapter {
  return useContext(RealtimeContext).adapter;
}
