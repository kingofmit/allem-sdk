import type { StorageAdapter } from "./StorageProvider";

/**
 * localStorage adapter. SSR-safe — returns a noop adapter on the server.
 */
export function localStorageAdapter(): StorageAdapter {
  if (typeof window === "undefined" || !window.localStorage) {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
  return {
    getItem: (key) => window.localStorage.getItem(key),
    setItem: (key, value) => window.localStorage.setItem(key, value),
    removeItem: (key) => window.localStorage.removeItem(key),
  };
}

/**
 * sessionStorage adapter. SSR-safe — returns a noop adapter on the server.
 */
export function sessionStorageAdapter(): StorageAdapter {
  if (typeof window === "undefined") {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
  return {
    getItem: (key) => window.sessionStorage.getItem(key),
    setItem: (key, value) => window.sessionStorage.setItem(key, value),
    removeItem: (key) => window.sessionStorage.removeItem(key),
  };
}

/**
 * Cookie adapter. SSR-safe — reads from document.cookie on the client.
 * Accepts optional cookie attributes (path, maxAge, secure, sameSite).
 */
export function cookieAdapter(
  options: {
    path?: string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {},
): StorageAdapter {
  const { path = "/", maxAge, secure, sameSite } = options;

  if (typeof document === "undefined") {
    return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }

  return {
    getItem(key) {
      const match = document.cookie.match(
        new RegExp("(?:^|; )" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"),
      );
      return match ? decodeURIComponent(match[1]) : null;
    },
    setItem(key, value) {
      let cookie = `${key}=${encodeURIComponent(value)}; path=${path}`;
      if (maxAge !== undefined) cookie += `; max-age=${maxAge}`;
      if (secure) cookie += "; secure";
      if (sameSite) cookie += `; samesite=${sameSite}`;
      document.cookie = cookie;
    },
    removeItem(key) {
      document.cookie = `${key}=; path=${path}; max-age=0`;
    },
  };
}

/**
 * In-memory adapter. Useful for testing or SSR contexts.
 */
export function memoryAdapter(): StorageAdapter {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key),
  };
}
