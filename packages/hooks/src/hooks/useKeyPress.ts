import { useState, useEffect } from "react";

/**
 * Detects whether a specific key is currently pressed.
 *
 * @example
 * ```tsx
 * const isEscPressed = useKeyPress("Escape");
 * const isEnterPressed = useKeyPress("Enter");
 * ```
 */
export function useKeyPress(targetKey: string): boolean {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDown = (e: KeyboardEvent) => {
      if (e.key === targetKey) setIsPressed(true);
    };

    const handleUp = (e: KeyboardEvent) => {
      if (e.key === targetKey) setIsPressed(false);
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, [targetKey]);

  return isPressed;
}
