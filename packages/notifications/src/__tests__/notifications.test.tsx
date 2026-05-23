import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { NotificationProvider, useNotify, useNotifications } from "../NotificationProvider";

function Wrapper({ children }: { children: ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}

function useNotifyAndList() {
  const { notify, dismiss, dismissAll } = useNotify();
  const notifications = useNotifications();
  return { notify, dismiss, dismissAll, notifications };
}

describe("@allem-sdk/notifications", () => {
  it("starts with empty notifications", () => {
    const { result } = renderHook(() => useNotifications(), { wrapper: Wrapper });
    expect(result.current).toEqual([]);
  });

  it("notify adds a notification", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });

    act(() => {
      result.current.notify({ title: "Hello", duration: 0 });
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].title).toBe("Hello");
    expect(result.current.notifications[0].type).toBe("info");
  });

  it("notify supports different types", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });

    act(() => {
      result.current.notify({ title: "Error!", type: "error", duration: 0 });
    });

    expect(result.current.notifications[0].type).toBe("error");
  });

  it("dismiss removes a notification", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });

    let id: string;
    act(() => {
      id = result.current.notify({ title: "Temp", duration: 0 });
    });

    expect(result.current.notifications).toHaveLength(1);

    act(() => {
      result.current.dismiss(id!);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it("dismissAll clears all notifications", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });

    act(() => {
      result.current.notify({ title: "One", duration: 0 });
      result.current.notify({ title: "Two", duration: 0 });
    });

    act(() => {
      result.current.dismissAll();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it("notify returns an id", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });
    let id: string;
    act(() => {
      id = result.current.notify({ title: "Test", duration: 0 });
    });
    expect(typeof id!).toBe("string");
    expect(id!.length).toBeGreaterThan(0);
  });

  it("notification includes message and createdAt", () => {
    const { result } = renderHook(() => useNotifyAndList(), { wrapper: Wrapper });

    act(() => {
      result.current.notify({ title: "Hi", message: "Details here", duration: 0 });
    });

    const notif = result.current.notifications[0];
    expect(notif.message).toBe("Details here");
    expect(notif.createdAt).toBeGreaterThan(0);
  });

  it("exports NotificationProvider", async () => {
    const mod = await import("../index");
    expect(typeof mod.NotificationProvider).toBe("function");
  });
});
