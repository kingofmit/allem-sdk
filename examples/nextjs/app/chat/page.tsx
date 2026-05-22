"use client";

import { useState } from "react";
import { useAllemChat } from "@allem-sdk/ai";
import { useTrack } from "@allem-sdk/analytics";

export default function ChatPage() {
  const track = useTrack();
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useAllemChat({
    onFinish: () => {
      track("Chat Message Completed");
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div>
      <div className="page-header">
        <h1>AI Chat</h1>
        <p>
          Built with <code>useAllemChat</code> from <code>@allem-sdk/ai</code>.
          Requires a <code>GOOGLE_GENERATIVE_AI_API_KEY</code> in <code>.env.local</code>.
        </p>
      </div>

      <div className="card">
        <div className="chat-container">
          {messages.length === 0 && (
            <div className="chat-empty">
              Send a message to start chatting.
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-message ${m.role === "user" ? "user" : "assistant"}`}
            >
              <div className="chat-role">
                {m.role === "user" ? "You" : "AI"}
              </div>
              <div className="chat-text">
                {m.parts
                  ?.filter((p) => p.type === "text")
                  .map((p) => p.text)
                  .join("") || ""}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="thinking">
              <span>Thinking</span>
              <span className="thinking-dots" />
            </div>
          )}

          {error && <p className="error">{error.message}</p>}
        </div>
      </div>

      <form onSubmit={onSubmit} className="chat-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
