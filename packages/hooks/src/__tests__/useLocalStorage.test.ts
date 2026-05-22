import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Mock localStorage for jsdom environment
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    for (const key in store) delete store[key];
  }),
  length: 0,
  key: vi.fn(() => null),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  it("returns initial value when nothing stored", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("sets and retrieves a value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    act(() => result.current[1]("updated"));
    expect(result.current[0]).toBe("updated");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("key", JSON.stringify("updated"));
  });

  it("removes a value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    act(() => result.current[1]("stored"));
    act(() => result.current[2]());
    expect(result.current[0]).toBe("default");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("key");
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);
  });
});
