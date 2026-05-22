import { describe, it, expect, vi } from "vitest";

// Mock upstream SDK modules to avoid @opentelemetry/api ESM resolution issues
vi.mock("ai", () => ({
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: () =>
      new Response("stream", { status: 200 }),
  })),
  convertToModelMessages: vi.fn(async (msgs: unknown[]) => msgs),
  DefaultChatTransport: vi.fn(),
}));

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(() => ({ messages: [], input: "", handleSubmit: vi.fn() })),
  useCompletion: vi.fn(() => ({
    completion: "",
    input: "",
    handleSubmit: vi.fn(),
  })),
}));

describe("@allem-sdk/ai", () => {
  it("exports useAllemChat", async () => {
    const { useAllemChat } = await import("../index");
    expect(typeof useAllemChat).toBe("function");
  });

  it("exports useAllemCompletion", async () => {
    const { useAllemCompletion } = await import("../index");
    expect(typeof useAllemCompletion).toBe("function");
  });

  it("exports AllemAIProvider", async () => {
    const { AllemAIProvider } = await import("../index");
    expect(typeof AllemAIProvider).toBe("function");
  });

  it("exports createAllemChatHandler", async () => {
    const { createAllemChatHandler } = await import("../index");
    expect(typeof createAllemChatHandler).toBe("function");
  });

  it("createAllemChatHandler returns a request handler", async () => {
    const { createAllemChatHandler } = await import("../index");
    const handler = createAllemChatHandler({
      providers: {},
      defaultProvider: "google",
    });
    expect(typeof handler).toBe("function");
  });

  it("handler returns 400 for unconfigured provider", async () => {
    const { createAllemChatHandler } = await import("../index");
    const handler = createAllemChatHandler({
      providers: {},
      defaultProvider: "google",
    });

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await handler(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("google");
  });

  it("handler calls streamText for configured provider", async () => {
    const { streamText } = await import("ai");
    const { createAllemChatHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const handler = createAllemChatHandler({
      providers: {
        google: () => mockModel as any,
      },
      defaultProvider: "google",
    });

    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await handler(req);
    expect(res.status).toBe(200);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: mockModel }),
    );
  });
});
