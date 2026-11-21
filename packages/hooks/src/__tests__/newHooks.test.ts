import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useThrottle } from "../hooks/useThrottle";
import { usePrevious } from "../hooks/usePrevious";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

describe("useThrottle", () => {
  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useThrottle("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("throttles value updates", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 100),
      { initialProps: { value: 0 } },
    );

    expect(result.current).toBe(0);

    rerender({ value: 1 });
    rerender({ value: 2 });
    rerender({ value: 3 });

    // Not yet updated (within throttle window)
    expect(result.current).toBe(0);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(3);
    vi.useRealTimers();
  });
});

describe("usePrevious", () => {
  it("returns undefined on first render", () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });

  it("returns previous value after update", () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 1 } },
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});

describe("useOnlineStatus", () => {
  it("returns true by default", () => {
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });
});
