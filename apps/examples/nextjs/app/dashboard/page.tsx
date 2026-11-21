"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth, useSession, ProtectedRoute } from "@allem-sdk/auth";
import { usePageView, useTrack, useIdentify } from "@allem-sdk/analytics";
import { useWindowSize, useLocalStorage, useDebounce, useMediaQuery } from "@allem-sdk/hooks";
import { useForm, required } from "@allem-sdk/forms";
import Link from "next/link";

// ─── Activity Feed (shows analytics events in real-time) ───
function useActivityFeed() {
  const [events, setEvents] = useState<
    { id: number; type: string; label: string; time: Date }[]
  >([]);
  const addEvent = useCallback((type: string, label: string) => {
    setEvents((prev) => {
      const base = Date.now();
      const id = prev.length > 0 && prev[0].id >= base ? prev[0].id + 1 : base;
      return [{ id, type, label, time: new Date() }, ...prev.slice(0, 19)];
    });
  }, []);
  return { events, addEvent };
}

// ─── Session Timer Widget ───
function SessionTimer({ expiresAt }: { expiresAt: number | null }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = Math.max(0, expiresAt - Date.now());
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setRemaining(
        `${hours.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const diff = expiresAt ? Math.max(0, expiresAt - Date.now()) : 0;
  const totalHours = 24;
  const hoursLeft = diff / 3600000;
  const pct = Math.min(100, (hoursLeft / totalHours) * 100);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>Session expires in</span>
        <span style={{ fontFamily: "monospace", fontWeight: 600, fontSize: "1.125rem", color: "var(--fg)" }}>
          {remaining}
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "var(--bg-subtle)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--fg)",
            borderRadius: 3,
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
}

// ─── Quick Notes Widget (useForm + useLocalStorage) ───
function QuickNotes({ onAction }: { onAction: (label: string) => void }) {
  const [notes, setNotes] = useLocalStorage<string[]>("dashboard-notes", []);

  const form = useForm({
    note: { initialValue: "", rules: [required("Note cannot be empty")] },
  });

  const addNote = (values: { note: string }) => {
    setNotes((prev) => [values.note, ...prev]);
    form.reset();
    onAction("Note added");
  };

  const removeNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
    onAction("Note removed");
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(addNote)}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input
          {...form.getFieldProps("note")}
          placeholder="Add a quick note..."
          style={{ flex: 1 }}
        />
        <button type="submit" style={{ padding: "0.625rem 1rem" }}>
          Add
        </button>
      </form>
      {notes.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: "0.8125rem", textAlign: "center", padding: "1rem 0" }}>
          No notes yet. Try adding one!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {notes.map((note, i) => (
            <div
              key={`${note}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem 0.75rem",
                background: "var(--bg-subtle)",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ color: "var(--fg)" }}>{note}</span>
              <button
                onClick={() => removeNote(i)}
                style={{
                  background: "transparent",
                  color: "var(--muted)",
                  padding: "0.125rem 0.375rem",
                  fontSize: "0.75rem",
                  boxShadow: "none",
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Search Widget (useDebounce) ───
function QuickSearch({ onAction }: { onAction: (label: string) => void }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const pages = [
    { name: "Hooks Demo", path: "/hooks", tags: ["useDebounce", "useToggle", "useLocalStorage"] },
    { name: "AI Chat", path: "/chat", tags: ["useAllemChat", "streaming"] },
    { name: "Contact Form", path: "/contact", tags: ["useForm", "validators"] },
    { name: "Login", path: "/login", tags: ["useAuth", "signIn"] },
  ];

  const filtered = debouncedQuery
    ? pages.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(debouncedQuery.toLowerCase()))
      )
    : pages;

  useEffect(() => {
    if (debouncedQuery) onAction(`Searched: "${debouncedQuery}"`);
  }, [debouncedQuery, onAction]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search pages and hooks..."
        style={{ marginBottom: "0.75rem" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {filtered.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 0.75rem",
              background: "var(--bg-subtle)",
              borderRadius: "var(--radius-xs)",
              textDecoration: "none",
              fontSize: "0.875rem",
              color: "var(--fg)",
              transition: "background 0.1s",
            }}
          >
            <span>{page.name}</span>
            <span style={{ display: "flex", gap: "0.25rem" }}>
              {page.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: "0.8125rem", textAlign: "center", padding: "0.75rem 0" }}>
            No results found.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
function DashboardContent() {
  const { user, signOut } = useAuth();
  const { session, update } = useSession();
  const track = useTrack();
  const identify = useIdentify();
  const { width, height } = useWindowSize();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { events, addEvent } = useActivityFeed();

  usePageView("Dashboard");

  useEffect(() => {
    if (user) {
      identify(user.id, { name: user.name, email: user.email });
      addEvent("identify", `Identified as ${user.name}`);
    }
  }, [user, identify, addEvent]);

  const trackAction = useCallback(
    (label: string) => {
      track("Dashboard Action", { action: label });
      addEvent("action", label);
    },
    [track, addEvent]
  );

  const handleRefresh = async () => {
    await update();
    trackAction("Session refreshed");
  };

  const handleSignOut = async () => {
    trackAction("Signed out");
    await signOut();
  };

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1>{greeting}, {user?.name?.split(" ")[0]}</h1>
          <p style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
            Here&apos;s your SDK dashboard — built with 4 packages working together.
          </p>
        </div>
        <button onClick={handleSignOut} className="btn-danger" style={{ flexShrink: 0 }}>
          Sign Out
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <div className="card" style={{ marginBottom: 0, textAlign: "center", padding: "1.25rem" }}>
          <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: "0.25rem" }}>
            Viewport
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)" }}>
            {width} × {height}
          </div>
          <div style={{ marginTop: "0.375rem" }}>
            <span className="badge">{isMobile ? "Mobile" : "Desktop"}</span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0, textAlign: "center", padding: "1.25rem" }}>
          <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: "0.25rem" }}>
            Events Tracked
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)" }}>
            {events.length}
          </div>
          <div style={{ marginTop: "0.375rem" }}>
            <span className="badge">Live</span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 0, textAlign: "center", padding: "1.25rem" }}>
          <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)", marginBottom: "0.25rem" }}>
            Auth Status
          </div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--fg)" }}>
            Active
          </div>
          <div style={{ marginTop: "0.375rem" }}>
            <span className="badge">
              <span className="status-dot" style={{ background: "var(--fg)", marginRight: "0.25rem" }} />
              Authenticated
            </span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
        {/* Session card */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ marginBottom: 0 }}>Session</h3>
            <button
              onClick={handleRefresh}
              className="btn-secondary"
              style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}
            >
              Refresh
            </button>
          </div>
          <SessionTimer expiresAt={session?.expiresAt ?? null} />
          <div style={{ marginTop: "1rem" }}>
            <div className="info-row">
              <span className="info-label">User</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Token</span>
              <span className="info-value" style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                {session?.token?.slice(0, 16)}...
              </span>
            </div>
          </div>
          <p style={{ fontSize: "0.6875rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Powered by <code>useSession</code> + <code>useAuth</code>
          </p>
        </div>

        {/* Activity feed */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3>Activity Feed</h3>
          <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {events.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: "0.8125rem", textAlign: "center", padding: "1.5rem 0" }}>
                Interact with widgets to see events appear here.
              </p>
            ) : (
              events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.375rem 0.625rem",
                    background: "var(--bg-subtle)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span
                    className="status-dot"
                    style={{
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1, color: "var(--fg)" }}>{evt.label}</span>
                  <span style={{ color: "var(--muted)", fontSize: "0.6875rem", fontFamily: "monospace", flexShrink: 0 }}>
                    {evt.time.toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
          <p style={{ fontSize: "0.6875rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Powered by <code>useTrack</code> + <code>useIdentify</code> + <code>usePageView</code>
          </p>
        </div>

        {/* Quick notes */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3>Quick Notes</h3>
          <QuickNotes onAction={trackAction} />
          <p style={{ fontSize: "0.6875rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Powered by <code>useForm</code> + <code>useLocalStorage</code>
          </p>
        </div>

        {/* Search */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3>Quick Search</h3>
          <QuickSearch onAction={trackAction} />
          <p style={{ fontSize: "0.6875rem", color: "var(--muted)", marginTop: "0.75rem" }}>
            Powered by <code>useDebounce</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute
      fallback={
        <div>
          <div className="page-header">
            <h1>Dashboard</h1>
            <p>A protected page that showcases multiple SDK packages working together.</p>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem" }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <h2>Authentication Required</h2>
            <p style={{ marginTop: "0.5rem", maxWidth: 360, margin: "0.5rem auto 0" }}>
              Sign in to access the dashboard and see all SDK packages working together.
            </p>
            <Link href="/login">
              <button style={{ marginTop: "1.5rem" }}>Sign In to Continue</button>
            </Link>
          </div>
        </div>
      }
      loadingFallback={
        <div>
          <div className="page-header">
            <h1>Dashboard</h1>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="card" style={{ marginBottom: 0, height: 100 }}>
                <div style={{ width: "60%", height: 12, background: "var(--skeleton)", borderRadius: 6, marginBottom: "0.75rem" }} />
                <div style={{ width: "40%", height: 24, background: "var(--skeleton)", borderRadius: 6 }} />
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card" style={{ marginBottom: 0, height: 200 }}>
                <div style={{ width: "50%", height: 14, background: "var(--skeleton)", borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <DashboardContent />
    </ProtectedRoute>
  );
}
