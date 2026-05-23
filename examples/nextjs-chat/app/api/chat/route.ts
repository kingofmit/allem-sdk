import { google } from "@ai-sdk/google";
import { createAllemChatHandler } from "allem-sdk";

export async function POST(req: Request) {
  const handler = createAllemChatHandler({
    providers: {
      google: (modelId) => google(modelId ?? "gemini-2.0-flash"),
    },
    defaultProvider: "google",
    systemPrompt: "You are a helpful assistant. Be concise and friendly.",
  });

  return handler(req);
}
