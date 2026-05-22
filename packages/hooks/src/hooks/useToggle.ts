import { useState, useCallback } from "react";

export function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const set = useCallback((v: boolean) => setValue(v), []);

  return [value, toggle, set];
}
