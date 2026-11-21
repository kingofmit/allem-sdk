import { useState, useEffect, useCallback, useRef } from "react";

interface UseFetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void;
}

/**
 * Simple data fetching hook with loading/error states and refetch.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading, refetch } = useFetch<User[]>("/api/users");
 * ```
 */
export function useFetch<T = unknown>(
  url: string | null,
  options?: RequestInit,
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: !!url,
  });

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(async () => {
    if (!url) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch(url, optionsRef.current);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = (await res.json()) as T;
      setState({ data, error: null, isLoading: false });
    } catch (err) {
      setState({ data: null, error: err as Error, isLoading: false });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
