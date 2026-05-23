import { useRef, useEffect } from "react";

/**
 * Returns the previous value of a variable.
 *
 * @example
 * ```tsx
 * const prevCount = usePrevious(count);
 * // On first render: undefined
 * // After count changes: previous count value
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
