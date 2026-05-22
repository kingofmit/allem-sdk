import type { AuthAdapter, AuthSession } from "@allem-sdk/auth";

const MOCK_USER = {
  id: "1",
  email: "demo@allem.dev",
  name: "Demo User",
};

const MOCK_SESSION: AuthSession = {
  user: MOCK_USER,
  token: "mock-jwt-token",
  expiresAt: Date.now() + 86400000,
};

let currentSession: AuthSession | null = null;

export const mockAuthAdapter: AuthAdapter = {
  getSession: async () => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));
    return currentSession ?? { user: null, token: null, expiresAt: null };
  },

  signIn: async (credentials) => {
    await new Promise((r) => setTimeout(r, 500));
    if (
      credentials.email === "demo@allem.dev" &&
      credentials.password === "password"
    ) {
      currentSession = MOCK_SESSION;
      return MOCK_SESSION;
    }
    throw new Error("Invalid credentials. Use demo@allem.dev / password");
  },

  signOut: async () => {
    await new Promise((r) => setTimeout(r, 300));
    currentSession = null;
  },
};
