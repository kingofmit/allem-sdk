import { useState, useEffect, useRef } from "react";

/**
 * Throttles a value, updating at most once per `delay` ms.
 *
 * @example
 * ```tsx
 * const throttledScroll = useThrottle(scrollPosition, 100);
 * ```
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdated = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastUpdated.current;

    if (elapsed >= delay) {
      setThrottled(value);
      lastUpdated.current = now;
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setThrottled(value);
        lastUpdated.current = Date.now();
      }, delay - elapsed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [value, delay]);

  return throttled;
}
