import { useState, useEffect, type RefObject } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { threshold = 0, root = null, rootMargin = "0px" } = options;

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, root, rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin]);

  return isIntersecting;
}
