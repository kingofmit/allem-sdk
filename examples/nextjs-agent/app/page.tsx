"use client";

import { useState } from "react";
import { AllemAIProvider, useAllemAgent } from "allem-sdk";

function AgentChat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, agentStatus, steps, isAgentRunning } =
    useAllemAgent({ api: "/api/agent" });

  return (
    <div>
      <h1>Allem SDK — Agent Example</h1>
      <p style={{ color: "#666" }}>
        Try: &quot;What&apos;s the weather in Paris and Tokyo? Then calculate the temperature difference.&quot;
      </p>

      <div style={{ marginBottom: 16, padding: 8, background: "#f5f5f5", borderRadius: 8 }}>
        <strong>Status:</strong> {agentStatus} | <strong>Steps:</strong> {steps.length} |{" "}
        <strong>Running:</strong> {isAgentRunning ? "yes" : "no"}
      </div>

      <div style={{ minHeight: 300, marginBottom: 16 }}>
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
            <strong>{m.role === "user" ? "You" : "Agent"}:</strong>
            {m.parts?.map((part, i) => {
              if (part.type === "text") return <span key={i}> {part.text}</span>;
              if (part.type === "tool-invocation") {
                const inv = part as unknown as {
                  toolName: string;
                  state: string;
                  result?: unknown;
                };
                return (
                  <div key={i} style={{ margin: "8px 0", padding: 8, background: "#fff3e0", borderRadius: 4, fontSize: 13 }}>
                    🔧 <strong>{inv.toolName}</strong> — {inv.state}
                    {inv.result && <pre style={{ margin: 4 }}>{JSON.stringify(inv.result, null, 2)}</pre>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
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
          placeholder="Ask the agent..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 16 }}
          disabled={isAgentRunning}
        />
        <button
          type="submit"
          disabled={isAgentRunning || !input.trim()}
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
      <AgentChat />
    </AllemAIProvider>
  );
}
