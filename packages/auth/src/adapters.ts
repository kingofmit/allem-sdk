import type { AuthAdapter, AuthSession } from "./AuthProvider";

/**
 * Supabase auth adapter. Wraps `@supabase/supabase-js` client.
 *
 * @example
 * ```tsx
 * import { createClient } from "@supabase/supabase-js";
 * const supabase = createClient(url, key);
 *
 * <AuthProvider adapter={supabaseAdapter(supabase)}>
 * ```
 */
export function supabaseAdapter(supabase: {
  auth: {
    getSession: () => Promise<{ data: { session: unknown } }>;
    signInWithPassword: (creds: {
      email: string;
      password: string;
    }) => Promise<{ data: { session: unknown; user: unknown }; error: unknown }>;
    signOut: () => Promise<unknown>;
  };
}): AuthAdapter {
  return {
    async getSession(): Promise<AuthSession> {
      const { data } = await supabase.auth.getSession();
      const session = data.session as Record<string, unknown> | null;
      if (!session) return { user: null, token: null, expiresAt: null };

      const user = session.user as Record<string, unknown> | null;
      return {
        user: user
          ? {
              id: String(user.id),
              email: user.email as string | undefined,
              name: (user.user_metadata as Record<string, unknown>)
                ?.full_name as string | undefined,
              image: (user.user_metadata as Record<string, unknown>)
                ?.avatar_url as string | undefined,
            }
          : null,
        token: (session.access_token as string) ?? null,
        expiresAt: session.expires_at
          ? (session.expires_at as number) * 1000
          : null,
      };
    },

    async signIn(credentials) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;

      const user = data.user as Record<string, unknown> | null;
      const session = data.session as Record<string, unknown> | null;
      return {
        user: user
          ? {
              id: String(user.id),
              email: user.email as string | undefined,
              name: (user.user_metadata as Record<string, unknown>)
                ?.full_name as string | undefined,
            }
          : null,
        token: session ? (session.access_token as string) : null,
        expiresAt: session?.expires_at
          ? (session.expires_at as number) * 1000
          : null,
      };
    },

    async signOut() {
      await supabase.auth.signOut();
    },
  };
}

/**
 * NextAuth adapter. Works with NextAuth.js v4/v5 session endpoint.
 *
 * @example
 * ```tsx
 * <AuthProvider adapter={nextAuthAdapter()}>
 * // or with custom base URL:
 * <AuthProvider adapter={nextAuthAdapter({ basePath: "/api/auth" })}>
 * ```
 */
export function nextAuthAdapter(options?: {
  basePath?: string;
}): AuthAdapter {
  const basePath = options?.basePath ?? "/api/auth";

  return {
    async getSession(): Promise<AuthSession> {
      const res = await fetch(`${basePath}/session`);
      if (!res.ok) return { user: null, token: null, expiresAt: null };

      const data = (await res.json()) as Record<string, unknown>;
      if (!data.user) return { user: null, token: null, expiresAt: null };

      const user = data.user as Record<string, unknown>;
      return {
        user: {
          id: String(user.id ?? user.email),
          email: user.email as string | undefined,
          name: user.name as string | undefined,
          image: user.image as string | undefined,
        },
        token: (data.accessToken as string) ?? null,
        expiresAt: data.expires
          ? new Date(data.expires as string).getTime()
          : null,
      };
    },

    async signIn(credentials) {
      const res = await fetch(`${basePath}/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error("Sign in failed");
      return this.getSession();
    },

    async signOut() {
      await fetch(`${basePath}/signout`, { method: "POST" });
    },
  };
}

/**
 * Clerk adapter. Wraps `@clerk/clerk-react` hooks for use with AuthProvider.
 *
 * @example
 * ```tsx
 * import { useClerk, useUser } from "@clerk/clerk-react";
 *
 * // Pass the Clerk instance:
 * <AuthProvider adapter={clerkAdapter(clerk)}>
 * ```
 */
export function clerkAdapter(clerk: {
  session: {
    getToken: () => Promise<string | null>;
  } | null;
  user: {
    id: string;
    primaryEmailAddress?: { emailAddress: string } | null;
    fullName?: string | null;
    imageUrl?: string | null;
  } | null | undefined;
  signOut: () => Promise<void>;
}): AuthAdapter {
  return {
    async getSession(): Promise<AuthSession> {
      if (!clerk.user) return { user: null, token: null, expiresAt: null };

      const token = clerk.session
        ? await clerk.session.getToken()
        : null;

      return {
        user: {
          id: clerk.user.id,
          email: clerk.user.primaryEmailAddress?.emailAddress,
          name: clerk.user.fullName ?? undefined,
          image: clerk.user.imageUrl ?? undefined,
        },
        token,
        expiresAt: null,
      };
    },

    async signIn() {
      // Clerk handles sign-in via its own UI components (SignIn, SignUp)
      // This adapter is for reading session state, not initiating sign-in
      throw new Error(
        "Clerk manages sign-in via its own components. Use <SignIn /> from @clerk/clerk-react.",
      );
    },

    async signOut() {
      await clerk.signOut();
    },
  };
}
