import { describe, it, expect, vi } from "vitest";

const mockCreateAgentUIStreamResponse = vi.fn(
  () => new Response("stream", { status: 200 }),
);

vi.mock("ai", () => ({
  ToolLoopAgent: vi.fn().mockImplementation((settings: any) => ({
    ...settings,
    generate: vi.fn(),
    stream: vi.fn(),
  })),
  createAgentUIStreamResponse: (...args: any[]) =>
    mockCreateAgentUIStreamResponse(...args),
  stepCountIs: vi.fn((n: number) => ({ type: "stepCount", count: n })),
  isLoopFinished: vi.fn(() => ({ type: "loopFinished" })),
  hasToolCall: vi.fn((name: string) => ({ type: "hasToolCall", name })),
  wrapLanguageModel: vi.fn(({ model }: any) => model),
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

  it("handler creates ToolLoopAgent with tools and streams response", async () => {
    const { ToolLoopAgent } = await import("ai");
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
    expect(ToolLoopAgent).toHaveBeenCalledWith(
      expect.objectContaining({ model: mockModel, tools: mockTools }),
    );
    expect(mockCreateAgentUIStreamResponse).toHaveBeenCalled();
  });

  it("handler uses custom maxSteps", async () => {
    const { ToolLoopAgent, stepCountIs } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const handler = createAllemAgentHandler({
      providers: {
        google: () => mockModel as any,
      },
      maxSteps: 20,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    await handler(req);
    expect(stepCountIs).toHaveBeenCalledWith(20);
  });

  it("exports stop condition helpers", async () => {
    const { stepCountIs, isLoopFinished, hasToolCall } = await import("../index");
    expect(typeof stepCountIs).toBe("function");
    expect(typeof isLoopFinished).toBe("function");
    expect(typeof hasToolCall).toBe("function");
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

  it("exports createAllemGuardrail", async () => {
    const { createAllemGuardrail } = await import("../index");
    expect(typeof createAllemGuardrail).toBe("function");
  });

  it("createAllemGuardrail returns middleware object", async () => {
    const { createAllemGuardrail } = await import("../index");

    const guardrail = createAllemGuardrail({
      name: "test-guardrail",
      beforeModel: async ({ params }) => params,
    });

    expect(guardrail).toHaveProperty("transformParams");
  });

  it("exports createMemoryAdapter", async () => {
    const { createMemoryAdapter } = await import("../index");
    expect(typeof createMemoryAdapter).toBe("function");
  });

  it("createMemoryAdapter stores and retrieves messages", async () => {
    const { createMemoryAdapter } = await import("../index");

    const memory = createMemoryAdapter();
    const messages = [{ role: "user", content: "hello" }];

    await memory.save("session-1", messages);
    const loaded = await memory.load("session-1");
    expect(loaded).toEqual(messages);

    await memory.clear("session-1");
    const empty = await memory.load("session-1");
    expect(empty).toEqual([]);
  });

  it("handler passes prepareStep to ToolLoopAgent", async () => {
    const { ToolLoopAgent } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const mockPrepareStep = vi.fn();
    const handler = createAllemAgentHandler({
      providers: { google: () => mockModel as any },
      prepareStep: mockPrepareStep,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    await handler(req);
    expect(ToolLoopAgent).toHaveBeenCalledWith(
      expect.objectContaining({ prepareStep: mockPrepareStep }),
    );
  });

  it("handler passes repairToolCall to ToolLoopAgent", async () => {
    const { ToolLoopAgent } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const mockRepair = vi.fn();
    const handler = createAllemAgentHandler({
      providers: { google: () => mockModel as any },
      repairToolCall: mockRepair,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    await handler(req);
    expect(ToolLoopAgent).toHaveBeenCalledWith(
      expect.objectContaining({ experimental_repairToolCall: mockRepair }),
    );
  });

  it("handler applies middleware via wrapLanguageModel", async () => {
    const { wrapLanguageModel } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const mockMiddleware = { transformParams: vi.fn() };
    const handler = createAllemAgentHandler({
      providers: { google: () => mockModel as any },
      middleware: mockMiddleware as any,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    await handler(req);
    expect(wrapLanguageModel).toHaveBeenCalledWith(
      expect.objectContaining({ model: mockModel, middleware: mockMiddleware }),
    );
  });

  it("handler passes context to ToolLoopAgent", async () => {
    const { ToolLoopAgent } = await import("ai");
    const { createAllemAgentHandler } = await import("../index");

    const mockModel = { id: "test-model" };
    const ctx = { userId: "u123", history: [] };
    const handler = createAllemAgentHandler({
      providers: { google: () => mockModel as any },
      context: ctx,
    });

    const req = new Request("http://localhost/api/agent", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });

    await handler(req);
    expect(ToolLoopAgent).toHaveBeenCalledWith(
      expect.objectContaining({ experimental_context: ctx }),
    );
  });
});
