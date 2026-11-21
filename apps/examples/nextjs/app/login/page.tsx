"use client";

import { useState } from "react";
import { useAuth } from "@allem-sdk/auth";
import Link from "next/link";

export default function LoginPage() {
  const { signIn, isAuthenticated, isLoading, user } = useAuth();
  const [email, setEmail] = useState("demo@allem.dev");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return (
      <div>
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p style={{ color: "var(--muted)" }}>Checking session...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <div className="card success-card">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.75rem" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h2>Logged in!</h2>
          <p style={{ marginTop: "0.5rem" }}>Welcome back, {user?.name}</p>
          <Link href="/dashboard">
            <button style={{ marginTop: "1.5rem" }}>Go to Dashboard</button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Login</h1>
        <p>
          Built with <code>useAuth</code> from <code>@allem-sdk/auth</code>.
          Uses a mock adapter with hardcoded credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: "420px" }}>
        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error" style={{ marginBottom: "1rem" }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="credential-hint">
          Demo credentials: <strong>demo@allem.dev</strong> / <strong>password</strong>
        </p>
      </form>
    </div>
  );
}
