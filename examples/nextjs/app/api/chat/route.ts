import { createAllemChatHandler } from "@allem-sdk/ai/server";

let google: ((model?: string) => import("ai").LanguageModel) | undefined;

try {
  // Dynamic import — only works if @ai-sdk/google is installed and GOOGLE_GENERATIVE_AI_API_KEY is set
  const mod = await import("@ai-sdk/google");
  google = (model?: string) => mod.google(model ?? "gemini-2.0-flash");
} catch {
  // Provider not available
}

export const POST = createAllemChatHandler({
  providers: {
    ...(google ? { google } : {}),
  },
  defaultProvider: "google",
  systemPrompt:
    "You are a helpful assistant demonstrating the Allem SDK AI package.",
});
