/**
 * Memory adapter interface for cross-session agent persistence.
 *
 * Implement this interface to store and retrieve conversation history
 * and agent context across sessions. Works with any storage backend
 * (database, Redis, file system, etc.).
 */
export interface AgentMemoryAdapter {
  /** Load messages for a given session. Returns empty array if none found. */
  load(sessionId: string): Promise<unknown[]>;
  /** Save messages for a given session. Called after each agent turn. */
  save(sessionId: string, messages: unknown[]): Promise<void>;
  /** Delete all messages for a given session. */
  clear(sessionId: string): Promise<void>;
}

/**
 * In-memory adapter for development and testing.
 * Messages are lost when the process restarts.
 *
 * @example
 * ```ts
 * const memory = createMemoryAdapter();
 *
 * createAllemAgentHandler({
 *   memory,
 *   providers: { google: (id) => google(id) },
 * });
 * ```
 */
export function createMemoryAdapter(): AgentMemoryAdapter {
  const store = new Map<string, unknown[]>();

  return {
    async load(sessionId: string) {
      return store.get(sessionId) ?? [];
    },
    async save(sessionId: string, messages: unknown[]) {
      store.set(sessionId, messages);
    },
    async clear(sessionId: string) {
      store.delete(sessionId);
    },
  };
}
