import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import {
  RealtimeProvider,
  type RealtimeAdapter,
  type ConnectionStatus,
} from "../RealtimeProvider";
import { useChannel } from "../useChannel";
import { usePresence } from "../usePresence";
import { useConnectionStatus } from "../useConnectionStatus";

function createMockAdapter(
  overrides: Partial<RealtimeAdapter> = {},
): RealtimeAdapter {
  return {
    subscribe: vi.fn(() => vi.fn()),
    publish: vi.fn(),
    getStatus: vi.fn(() => "connected" as ConnectionStatus),
    ...overrides,
  };
}

function createWrapper(adapter: RealtimeAdapter) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <RealtimeProvider adapter={adapter}>{children}</RealtimeProvider>
    );
  };
}

describe("@allem-sdk/realtime", () => {
  it("useChannel subscribes on mount and unsubscribes on unmount", () => {
    const unsub = vi.fn();
    const adapter = createMockAdapter({ subscribe: vi.fn(() => unsub) });

    const { unmount } = renderHook(
      () => useChannel("room", vi.fn()),
      { wrapper: createWrapper(adapter) },
    );

    expect(adapter.subscribe).toHaveBeenCalledWith("room", expect.any(Function));
    unmount();
    expect(unsub).toHaveBeenCalled();
  });

  it("useChannel publish sends to adapter", () => {
    const adapter = createMockAdapter();

    const { result } = renderHook(
      () => useChannel("room", vi.fn()),
      { wrapper: createWrapper(adapter) },
    );

    act(() => result.current.publish({ text: "hello" }));
    expect(adapter.publish).toHaveBeenCalledWith("room", { text: "hello" });
  });

  it("useChannel delivers messages to callback", () => {
    let capturedCallback: ((data: unknown) => void) | undefined;
    const adapter = createMockAdapter({
      subscribe: vi.fn((_ch, cb) => {
        capturedCallback = cb;
        return vi.fn();
      }),
    });

    const onMessage = vi.fn();
    renderHook(
      () => useChannel("room", onMessage),
      { wrapper: createWrapper(adapter) },
    );

    act(() => capturedCallback?.({ text: "hi" }));
    expect(onMessage).toHaveBeenCalledWith({ text: "hi" });
  });

  it("usePresence returns empty array without presence support", () => {
    const adapter = createMockAdapter();

    const { result } = renderHook(
      () => usePresence("room"),
      { wrapper: createWrapper(adapter) },
    );

    expect(result.current).toEqual([]);
  });

  it("usePresence enters and leaves channel", () => {
    const enterPresence = vi.fn();
    const leavePresence = vi.fn();
    const adapter = createMockAdapter({
      subscribePresence: vi.fn(() => vi.fn()),
      enterPresence,
      leavePresence,
    });

    const { unmount } = renderHook(
      () => usePresence("room", { name: "Ahmed" }),
      { wrapper: createWrapper(adapter) },
    );

    expect(enterPresence).toHaveBeenCalledWith("room", { name: "Ahmed" });
    unmount();
    expect(leavePresence).toHaveBeenCalledWith("room");
  });

  it("useConnectionStatus returns adapter status", () => {
    const adapter = createMockAdapter({ getStatus: () => "connected" });

    const { result } = renderHook(
      () => useConnectionStatus(),
      { wrapper: createWrapper(adapter) },
    );

    expect(result.current).toBe("connected");
  });

  it("exports RealtimeProvider", async () => {
    const mod = await import("../index");
    expect(typeof mod.RealtimeProvider).toBe("function");
  });

  it("exports useChannel and usePresence", async () => {
    const mod = await import("../index");
    expect(typeof mod.useChannel).toBe("function");
    expect(typeof mod.usePresence).toBe("function");
    expect(typeof mod.useConnectionStatus).toBe("function");
  });
});
