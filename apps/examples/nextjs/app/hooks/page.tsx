"use client";

import { useRef, useState } from "react";
import {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useClickOutside,
  useToggle,
  useCopyToClipboard,
  useIntersectionObserver,
  useWindowSize,
} from "@allem-sdk/hooks";

function DebounceDemo() {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 500);

  return (
    <div className="card">
      <h3>useDebounce</h3>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <div className="demo-result">
        Debounced (500ms): <strong>{debounced || "—"}</strong>
      </div>
    </div>
  );
}

function LocalStorageDemo() {
  const [count, setCount] = useLocalStorage("demo-count", 0);

  return (
    <div className="card">
      <h3>useLocalStorage</h3>
      <div className="demo-result">
        Persisted count: <strong>{count}</strong>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button className="btn-secondary" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

function MediaQueryDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="card">
      <h3>useMediaQuery</h3>
      <div className="info-row">
        <span className="info-label">Mobile (&le;768px)</span>
        <span className="info-value">
          <span className={`status-dot ${isMobile ? "success" : "error"}`} />
          {isMobile ? "Yes" : "No"}
        </span>
      </div>
      <div className="info-row">
        <span className="info-label">Prefers dark mode</span>
        <span className="info-value">
          <span className={`status-dot ${prefersDark ? "success" : "error"}`} />
          {prefersDark ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
}

function ClickOutsideDemo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="card">
      <h3>useClickOutside</h3>
      <div ref={ref} style={{ position: "relative" }}>
        <button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"} Dropdown
        </button>
        {open && (
          <ul className="dropdown">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
      <p style={{ color: "var(--muted)", marginTop: "0.75rem", fontSize: "0.8125rem" }}>
        Click outside the dropdown to close it.
      </p>
    </div>
  );
}

function ToggleDemo() {
  const [isOn, toggle] = useToggle(false);

  return (
    <div className="card">
      <h3>useToggle</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          className={`toggle-switch ${isOn ? "active" : ""}`}
          onClick={toggle}
          aria-label="Toggle"
        />
        <span className="info-value">{isOn ? "ON" : "OFF"}</span>
      </div>
    </div>
  );
}

function CopyDemo() {
  const [copied, copy] = useCopyToClipboard();
  const text = "npm install @allem-sdk/hooks";

  return (
    <div className="card">
      <h3>useCopyToClipboard</h3>
      <div className="code-block">
        <code>{text}</code>
        <button
          onClick={() => copy(text)}
          style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}
          className={copied ? "btn-success" : ""}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function IntersectionDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.5 });

  return (
    <div className="card">
      <h3>useIntersectionObserver</h3>
      <div
        ref={ref}
        className={`intersection-box ${isVisible ? "visible" : "hidden"}`}
      >
        {isVisible ? "Visible!" : "Not fully visible"}
      </div>
    </div>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="card">
      <h3>useWindowSize</h3>
      <div className="info-row">
        <span className="info-label">Width</span>
        <span className="info-value">{width}px</span>
      </div>
      <div className="info-row">
        <span className="info-label">Height</span>
        <span className="info-value">{height}px</span>
      </div>
    </div>
  );
}

export default function HooksPage() {
  return (
    <div>
      <div className="page-header">
        <h1>Hooks Demo</h1>
        <p>
          Interactive demos of all 8 hooks from <code>@allem-sdk/hooks</code>.
        </p>
      </div>
      <div className="grid-cards">
        <DebounceDemo />
        <LocalStorageDemo />
        <MediaQueryDemo />
        <ClickOutsideDemo />
        <ToggleDemo />
        <CopyDemo />
        <IntersectionDemo />
        <WindowSizeDemo />
      </div>
    </div>
  );
}
