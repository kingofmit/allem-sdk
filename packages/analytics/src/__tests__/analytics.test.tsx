import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { AnalyticsProvider, type AnalyticsAdapter } from "../AnalyticsProvider";
import { useTrack } from "../useTrack";
import { useIdentify } from "../useIdentify";

function createMockAdapter(): AnalyticsAdapter {
  return {
    track: vi.fn(),
    page: vi.fn(),
    identify: vi.fn(),
  };
}

describe("Analytics", () => {
  it("useTrack calls all adapters", () => {
    const adapter1 = createMockAdapter();
    const adapter2 = createMockAdapter();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AnalyticsProvider adapters={[adapter1, adapter2]}>{children}</AnalyticsProvider>
    );

    const { result } = renderHook(() => useTrack(), { wrapper });
    act(() => result.current("click", { button: "signup" }));

    expect(adapter1.track).toHaveBeenCalledWith("click", { button: "signup" });
    expect(adapter2.track).toHaveBeenCalledWith("click", { button: "signup" });
  });

  it("useIdentify calls all adapters", () => {
    const adapter = createMockAdapter();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AnalyticsProvider adapters={[adapter]}>{children}</AnalyticsProvider>
    );

    const { result } = renderHook(() => useIdentify(), { wrapper });
    act(() => result.current("user-123", { name: "Ahmed" }));

    expect(adapter.identify).toHaveBeenCalledWith("user-123", { name: "Ahmed" });
  });

  it("works with no adapters", () => {
    const { result } = renderHook(() => useTrack());
    // Should not throw
    act(() => result.current("event"));
  });
});
