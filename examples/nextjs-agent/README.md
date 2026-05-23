# Allem SDK — Next.js Agent Example

A multi-step AI agent with tool calling, guardrails, and the "think-then-act" pattern.

## Features

- **Multi-step tool loops** — Agent calls weather + calculator tools autonomously
- **Think-then-act** — Step 0 reasons without tools, then acts
- **Guardrails** — Middleware logs every generation
- **Live status** — Shows agent status, step count, and tool invocations

## Setup

```bash
cd examples/nextjs-agent
cp .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY
pnpm install
pnpm dev
```

## Try it

> "What's the weather in Paris and Tokyo? Then calculate the temperature difference."

The agent will:
1. Think about the approach (no tools)
2. Call the weather tool for Paris
3. Call the weather tool for Tokyo
4. Call the calculator tool for the difference
5. Respond with the summary
