export default function AgentsGettingStartedPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Getting Started with Agents</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Build an AI agent that can call tools, track its own progress, and respond with results. This guide walks you through a complete agent from scratch.
      </p>

      <h2 className="mt-12 text-xl font-semibold">1. Install dependencies</h2>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`npm install @allem-sdk/agents @allem-sdk/ai ai @ai-sdk/react @ai-sdk/google zod`}</pre>
      </div>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        You can swap <code className="font-mono text-xs">@ai-sdk/google</code> for <code className="font-mono text-xs">@ai-sdk/anthropic</code> or <code className="font-mono text-xs">@ai-sdk/openai</code>.
      </p>

      <h2 className="mt-12 text-xl font-semibold">2. Set your API key</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        Create a <code className="font-mono text-xs">.env.local</code> file in your project root:
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here

# Or for other providers:
# ANTHROPIC_API_KEY=your-api-key-here
# OPENAI_API_KEY=your-api-key-here`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">3. Define your tools (server)</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        Tools are functions your agent can call. Each tool has a description (so the AI knows when to use it), a zod schema (for typed parameters), and an execute function.
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// lib/tools.ts
import { createAllemTool } from "@allem-sdk/agents";
import { z } from "zod";

export const weatherTool = createAllemTool({
  description: "Get the current weather for a city",
  parameters: z.object({
    city: z.string().describe("City name, e.g. 'San Francisco'"),
  }),
  execute: async ({ city }) => {
    // Replace with a real API call
    const data = await fetch(
      \`https://api.weatherapi.com/v1/current.json?q=\${city}\`
    ).then((r) => r.json());
    return {
      city,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    };
  },
});

export const calculatorTool = createAllemTool({
  description: "Perform a math calculation",
  parameters: z.object({
    expression: z.string().describe("Math expression, e.g. '2 + 2'"),
  }),
  execute: async ({ expression }) => {
    const result = Function(\`"use strict"; return (\${expression})\`)();
    return { expression, result };
  },
});`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">4. Create the API route (server)</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        The agent handler receives messages from the client, passes them to the AI model with your tools, and streams the response back.
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// app/api/agent/route.ts
import { createAllemAgentHandler } from "@allem-sdk/agents";
import { google } from "@ai-sdk/google";
import { weatherTool, calculatorTool } from "@/lib/tools";

export const POST = createAllemAgentHandler({
  providers: {
    google: (model) => google(model ?? "gemini-2.0-flash"),
  },
  tools: {
    weather: weatherTool,
    calculator: calculatorTool,
  },
  systemPrompt: "You are a helpful assistant. Use the available tools when needed to answer questions accurately.",
});`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">5. Build the agent UI (client)</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        The <code className="font-mono text-xs">useAllemAgent</code> hook gives you everything you need: messages, agent status, tool call tracking, and step history.
      </p>
      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`// app/page.tsx
"use client";

import { useState } from "react";
import { AllemAIProvider } from "@allem-sdk/ai";
import { useAllemAgent } from "@allem-sdk/agents";

export default function Home() {
  return (
    <AllemAIProvider api="/api/agent" provider="google">
      <Agent />
    </AllemAIProvider>
  );
}

function Agent() {
  const [input, setInput] = useState("");
  const {
    messages,
    sendMessage,
    agentStatus,
    steps,
    currentToolCalls,
    isAgentRunning,
  } = useAllemAgent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAgentRunning) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>AI Agent</h1>

      {/* Status indicator */}
      <AgentStatusBadge status={agentStatus} toolCalls={currentToolCalls} />

      {/* Messages */}
      <div style={{ marginTop: 16 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 8,
              background: m.role === "user" ? "#e8f0fe" : "#f8f9fa",
            }}
          >
            <strong>{m.role === "user" ? "You" : "Agent"}</strong>
            <div>
              {m.parts
                ?.filter((p) => p.type === "text")
                .map((p, i) => <p key={i}>{p.text}</p>)}
            </div>
          </div>
        ))}
      </div>

      {/* Step history */}
      {steps.length > 0 && (
        <div style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
          <strong>Steps taken: {steps.length}</strong>
          <ul>
            {steps.map((step) => (
              <li key={step.stepIndex}>
                Step {step.stepIndex + 1}:{" "}
                {step.toolCalls.map((tc) => tc.toolName).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isAgentRunning}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          disabled={isAgentRunning}
          style={{ padding: "8px 16px", borderRadius: 6, background: "#4f46e5", color: "#fff", border: "none" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">6. Show agent status</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        The <code className="font-mono text-xs">agentStatus</code> property tracks the agent lifecycle. Use it to show contextual feedback to the user.
      </p>

      <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-neutral-950/5 dark:ring-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">When</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">What to show</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">idle</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">No conversation yet, or agent finished</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Input field, ready state</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">thinking</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">AI is generating a response</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Loading spinner, "Thinking..."</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">calling-tool</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">AI decided to call a tool</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Tool name, "Looking up weather..."</td></tr>
            <tr><td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">done</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Agent finished its response</td><td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">Final answer, step summary</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-neutral-900 p-4 ring-1 ring-white/10 shadow-lg">
        <pre className="text-sm text-neutral-100">{`function AgentStatusBadge({
  status,
  toolCalls,
}: {
  status: "idle" | "thinking" | "calling-tool" | "done";
  toolCalls: { toolName: string }[];
}) {
  if (status === "idle") return null;

  const labels = {
    thinking: "Thinking...",
    "calling-tool": \`Using tool: \${toolCalls[0]?.toolName ?? "..."}\`,
    done: "Done",
  };

  return (
    <div style={{
      padding: "6px 12px",
      borderRadius: 6,
      fontSize: 13,
      background: status === "calling-tool" ? "#fef3c7" : "#e0e7ff",
      color: status === "calling-tool" ? "#92400e" : "#3730a3",
    }}>
      {labels[status]}
    </div>
  );
}`}</pre>
      </div>

      <h2 className="mt-12 text-xl font-semibold">7. Try it out</h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        Start your dev server and try these prompts:
      </p>
      <ul className="mt-3 list-disc pl-6 text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
        <li><strong>"What's the weather in Tokyo?"</strong> &rarr; agent calls the weather tool, returns the result</li>
        <li><strong>"What's 1847 * 293?"</strong> &rarr; agent calls the calculator tool</li>
        <li><strong>"What's the weather in Paris and London?"</strong> &rarr; agent may call the tool twice in separate steps</li>
        <li><strong>"Tell me a joke"</strong> &rarr; agent responds directly without calling any tools</li>
      </ul>

      <h2 className="mt-12 text-xl font-semibold">What's happening under the hood</h2>
      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
        <ol className="list-decimal pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-3">
          <li>User sends a message via <code className="font-mono text-xs">sendMessage()</code></li>
          <li>The message is sent to your <code className="font-mono text-xs">/api/agent</code> route</li>
          <li><code className="font-mono text-xs">createAllemAgentHandler</code> passes it to the AI model with your tools</li>
          <li>The AI model decides whether to respond directly or call a tool</li>
          <li>If it calls a tool, the <code className="font-mono text-xs">execute</code> function runs and the result is sent back to the model</li>
          <li>The model generates a final response incorporating the tool result</li>
          <li>On the client, <code className="font-mono text-xs">useAllemAgent</code> tracks each step: <code className="font-mono text-xs">thinking &rarr; calling-tool &rarr; done</code></li>
        </ol>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Next steps</h2>
      <ul className="mt-3 list-disc pl-6 text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
        <li>Add more tools with <a href="/docs/agents/create-allem-tool" className="text-indigo-600 dark:text-indigo-400 underline">createAllemTool</a></li>
        <li>Display tool metadata in your UI with <a href="/docs/agents/agent-provider" className="text-indigo-600 dark:text-indigo-400 underline">AgentProvider</a></li>
        <li>Customize the API endpoint and headers via <a href="/docs/agents/use-allem-agent" className="text-indigo-600 dark:text-indigo-400 underline">useAllemAgent options</a></li>
        <li>Use a different provider by swapping <code className="font-mono text-xs">@ai-sdk/google</code> for <code className="font-mono text-xs">@ai-sdk/anthropic</code> or <code className="font-mono text-xs">@ai-sdk/openai</code></li>
      </ul>
    </div>
  );
}
