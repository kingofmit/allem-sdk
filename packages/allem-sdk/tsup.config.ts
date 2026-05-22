import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/hooks.ts",
    "src/ai.ts",
    "src/forms.ts",
    "src/analytics.ts",
    "src/auth.ts",
    "src/agents.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "ai",
    "@ai-sdk/react",
    "@ai-sdk/openai",
    "@ai-sdk/anthropic",
    "@ai-sdk/google",
  ],
  banner: {
    js: '"use client";',
  },
});
