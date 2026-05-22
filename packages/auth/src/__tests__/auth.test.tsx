import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderHook, act, render, screen } from "@testing-library/react";
import { AuthProvider, type AuthAdapter, type AuthSession } from "../AuthProvider";
import { useAuth } from "../useAuth";
import { useSession } from "../useSession";
import { ProtectedRoute } from "../ProtectedRoute";

const mockUser = { id: "1", email: "ahmed@test.com", name: "Ahmed" };
const authenticatedSession: AuthSession = { user: mockUser, token: "tok", expiresAt: Date.now() + 3600000 };
const emptySession: AuthSession = { user: null, token: null, expiresAt: null };

function createMockAdapter(session: AuthSession = authenticatedSession): AuthAdapter {
  return {
    getSession: vi.fn().mockResolvedValue(session),
    signIn: vi.fn().mockResolvedValue(authenticatedSession),
    signOut: vi.fn().mockResolvedValue(undefined),
  };
}

function createWrapper(adapter: AuthAdapter) {
  return ({ children }: { children: React.ReactNode }) => (
    <AuthProvider adapter={adapter}>{children}</AuthProvider>
  );
}

describe("useAuth", () => {
  it("starts in loading state then resolves", async () => {
    const adapter = createMockAdapter();
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper(adapter) });

    expect(result.current.isLoading).toBe(true);

    await vi.waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("handles unauthenticated session", async () => {
    const adapter = createMockAdapter(emptySession);
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper(adapter) });

    await vi.waitFor(() => {
      expect(result.current.status).toBe("unauthenticated");
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("signs out", async () => {
    const adapter = createMockAdapter();
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper(adapter) });

    await vi.waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(adapter.signOut).toHaveBeenCalled();
  });
});

describe("useSession", () => {
  it("returns session data", async () => {
    const adapter = createMockAdapter();
    const { result } = renderHook(() => useSession(), { wrapper: createWrapper(adapter) });

    await vi.waitFor(() => {
      expect(result.current.session).not.toBeNull();
    });

    expect(result.current.session?.token).toBe("tok");
  });
});

describe("ProtectedRoute", () => {
  it("shows children when authenticated", async () => {
    const adapter = createMockAdapter();

    render(
      <AuthProvider adapter={adapter}>
        <ProtectedRoute fallback={<div>Login</div>}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </AuthProvider>,
    );

    await vi.waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeDefined();
    });
  });

  it("shows fallback when unauthenticated", async () => {
    const adapter = createMockAdapter(emptySession);

    render(
      <AuthProvider adapter={adapter}>
        <ProtectedRoute fallback={<div>Login</div>}>
          <div>Protected Content</div>
        </ProtectedRoute>
      </AuthProvider>,
    );

    await vi.waitFor(() => {
      expect(screen.getByText("Login")).toBeDefined();
    });
  });

  it("throws when used outside AuthProvider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth must be used within an <AuthProvider>");
  });
});
