import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { StorageProvider } from "../StorageProvider";
import { useStorageItem } from "../useStorageItem";
import { memoryAdapter, localStorageAdapter, sessionStorageAdapter, cookieAdapter } from "../adapters";

function createWrapper(adapter = memoryAdapter()) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <StorageProvider adapter={adapter}>{children}</StorageProvider>;
  };
}

describe("@allem-sdk/storage", () => {
  it("useStorageItem returns initial value when key is empty", () => {
    const { result } = renderHook(() => useStorageItem("key", "default"), {
      wrapper: createWrapper(),
    });
    expect(result.current[0]).toBe("default");
  });

  it("useStorageItem persists and retrieves values", () => {
    const adapter = memoryAdapter();
    const wrapper = createWrapper(adapter);

    const { result } = renderHook(() => useStorageItem("name", ""), { wrapper });

    act(() => result.current[1]("Ahmed"));
    expect(result.current[0]).toBe("Ahmed");
    expect(adapter.getItem("name")).toBe('"Ahmed"');
  });

  it("useStorageItem supports updater function", () => {
    const { result } = renderHook(() => useStorageItem("count", 0), {
      wrapper: createWrapper(),
    });

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1]((prev) => prev + 5));
    expect(result.current[0]).toBe(6);
  });

  it("useStorageItem removes value", () => {
    const adapter = memoryAdapter();
    const wrapper = createWrapper(adapter);

    const { result } = renderHook(() => useStorageItem("temp", "value"), { wrapper });

    act(() => result.current[1]("saved"));
    expect(adapter.getItem("temp")).toBe('"saved"');

    act(() => result.current[2]());
    expect(result.current[0]).toBe("value");
    expect(adapter.getItem("temp")).toBeNull();
  });

  it("memoryAdapter stores and retrieves", () => {
    const adapter = memoryAdapter();
    adapter.setItem("k", "v");
    expect(adapter.getItem("k")).toBe("v");
    adapter.removeItem("k");
    expect(adapter.getItem("k")).toBeNull();
  });

  it("localStorageAdapter is SSR-safe", () => {
    const adapter = localStorageAdapter();
    expect(adapter.getItem("missing")).toBeNull();
  });

  it("sessionStorageAdapter is SSR-safe", () => {
    const adapter = sessionStorageAdapter();
    expect(adapter.getItem("missing")).toBeNull();
  });

  it("cookieAdapter is SSR-safe", () => {
    const adapter = cookieAdapter();
    expect(adapter.getItem("missing")).toBeNull();
  });

  it("useStorageItem reads pre-existing value from adapter", () => {
    const adapter = memoryAdapter();
    adapter.setItem("preloaded", '"hello"');

    const { result } = renderHook(() => useStorageItem("preloaded", "fallback"), {
      wrapper: createWrapper(adapter),
    });

    expect(result.current[0]).toBe("hello");
  });

  it("exports StorageProvider", async () => {
    const mod = await import("../index");
    expect(typeof mod.StorageProvider).toBe("function");
  });
});
