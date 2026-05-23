"use client";

import { useState } from "react";
import { AllemAIProvider, useAllemChat } from "allem-sdk";

function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useAllemChat();

  return (
    <div>
      <h1>Allem SDK — Chat Example</h1>

      <div style={{ minHeight: 400, marginBottom: 16 }}>
        {messages.length === 0 && (
          <p style={{ color: "#999" }}>Send a message to start chatting.</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              background: m.role === "user" ? "#e3f2fd" : "#f5f5f5",
            }}
          >
            <strong>{m.role === "user" ? "You" : "AI"}:</strong>{" "}
            {m.parts?.filter((p) => p.type === "text").map((p, i) => (
              <span key={i}>{p.text}</span>
            ))}
          </div>
        ))}
        {status === "streaming" && (
          <div style={{ color: "#999", fontSize: 14 }}>Thinking...</div>
        )}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input.trim()) return;
          const text = input;
          setInput("");
          await sendMessage({ text });
        }}
        style={{ display: "flex", gap: 8 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 16 }}
        />
        <button
          type="submit"
          disabled={status === "streaming"}
          style={{ padding: "10px 20px", borderRadius: 8, background: "#1976d2", color: "#fff", border: "none", cursor: "pointer", fontSize: 16 }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <AllemAIProvider provider="google">
      <Chat />
    </AllemAIProvider>
  );
}
