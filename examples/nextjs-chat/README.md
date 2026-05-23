# Allem SDK — Next.js Chat Example

A simple AI chat app using `useAllemChat` with Google Gemini.

## Setup

```bash
cd examples/nextjs-chat
cp .env.example .env.local
# Add your GOOGLE_GENERATIVE_AI_API_KEY
pnpm install
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) and start chatting.

## What this shows

- `AllemAIProvider` for global AI config
- `useAllemChat` for streaming chat
- `createAllemChatHandler` on the server
- Multi-provider support (swap `google` for `anthropic` or `openai`)
