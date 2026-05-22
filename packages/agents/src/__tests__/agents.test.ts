import { describe, it, expect, vi } from "vitest";

vi.mock("ai", () => ({
  streamText: vi.fn(() => ({
    toUIMessageStreamResponse: () =>
      new Response("stream", { status: 200 }),
  })),
  convertToModelMessages: vi.fn(async (msgs: unknown[]) => msgs),
  DefaultChatTransport: vi.fn(),
}));

vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(() => ({
    messages: [],
    input: "",
    handleSubmit: vi.fn(),
    isLoading: false,
  })),
}));

vi.mock("@allem-sdk/ai", () => ({
  useAllemAIConfig: vi.fn(() => ({
    api: "/api/chat",
    provider: "google",
  })),
}));

describe("@allem-sdk/agents", () => {
  it("exports useAllemAgent", async () => {
    const { useAllemAgent } = await import("../index");
    expect(typeof useAllemAgent).toBe("function");
  });

  it("exports AgentProvider", async () => {
    const { AgentProvider } = await import("../index");
    expect(typeof AgentProvider).toBe("function");
  });

  it("exports useAgentTools", async () => {
    const { useAgentTools } = await import("../index");
    expect(typeof useAgentTools).toBe("function");
  });

  it("exports createAllemTool", async () => {
    const { createAllemTool } = await import("../index");
    expect(typeof createAllemTool).toBe("function");
  });

  it("exports createAllemAgentHandler", async () => {
    const { createAllemAgentHandler } = await import("../index");
    expect(typeof createAllemAgentHandler).toBe("function");
  });

  it("createAllemAgentHandler returns a request handler", async () => {
    const { createAllemAgentHandler } = await import("../index");
    const handler = createAllemAgentHandler({
      providers: {},
      defaultProvider: "google",
    });
    expect(typeof handler).toBe("function");
  });

  it("handler returns 400 for unconfigured provider", async () => {
    const { createAllemAgentHandler } = await import("../index");
    const handler = createAllemAgentHandler({
      providers: {},
      defaultProvider: "google",
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await handler(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("google");
  });

  it("handler calls streamText with tools", async () => {
    const { streamText } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const mockTools = { search: { description: "Search" } };
    const handler = createAllemAgentHandler({
      providers: {
        google: () => mockModel as any,
      },
      defaultProvider: "google",
      tools: mockTools as any,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await handler(req);
    expect(res.status).toBe(200);
    expect(streamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: mockModel, tools: mockTools }),
    );
  });

  it("createAllemTool returns a tool definition", async () => {
    const { createAllemTool } = await import("../index");

    const result = createAllemTool({
      description: "Test tool",
      parameters: {} as any,
      execute: async () => "result",
    });

    expect(result).toHaveProperty("description", "Test tool");
    expect(result).toHaveProperty("parameters");
    expect(result).toHaveProperty("execute");
  });
});
