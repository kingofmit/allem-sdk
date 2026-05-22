import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { client: "src/client.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    external: ["react", "react-dom", "ai", "@ai-sdk/react", "@ai-sdk/google", "@ai-sdk/anthropic", "@ai-sdk/openai"],
    banner: {
      js: '"use client";',
    },
  },
  {
    entry: { server: "src/server.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    external: ["react", "react-dom", "ai", "@ai-sdk/react", "@ai-sdk/google", "@ai-sdk/anthropic", "@ai-sdk/openai"],
  },
  {
    entry: { index: "src/index.ts" },
    format: ["cjs", "esm"],
    dts: true,
    clean: false,
    external: ["react", "react-dom", "ai", "@ai-sdk/react", "@ai-sdk/google", "@ai-sdk/anthropic", "@ai-sdk/openai"],
  },
]);
