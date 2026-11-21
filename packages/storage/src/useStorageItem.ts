import { useState, useCallback } from "react";
import { useStorageAdapter } from "./StorageProvider";

/**
 * React hook for reading/writing a single key in the configured storage adapter.
 * Similar to `useLocalStorage` but adapter-agnostic.
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useStorageItem("theme", "light");
 * ```
 */
export function useStorageItem<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const adapter = useStorageAdapter();

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = adapter.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          adapter.setItem(key, JSON.stringify(next));
        } catch {
          // storage full or unavailable — state still updates
        }
        return next;
      });
    },
    [adapter, key],
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    adapter.removeItem(key);
  }, [adapter, key, initialValue]);

  return [storedValue, setValue, removeValue];
}
