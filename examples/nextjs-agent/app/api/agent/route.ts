import { google } from "@ai-sdk/google";
import { z } from "zod";
import {
  createAllemAgentHandler,
  createAllemTool,
  createAllemGuardrail,
  thinkThenAct,
} from "allem-sdk";

// --- Tools ---

const weatherTool = createAllemTool({
  description: "Get the current weather for a city",
  parameters: z.object({
    city: z.string().describe("The city name"),
  }),
  execute: async ({ city }) => ({
    city,
    temperature: Math.round(Math.random() * 30 + 10),
    condition: ["sunny", "cloudy", "rainy", "snowy"][Math.floor(Math.random() * 4)],
  }),
});

const calculatorTool = createAllemTool({
  description: "Perform a math calculation",
  parameters: z.object({
    expression: z.string().describe("Math expression to evaluate, e.g. '2 + 2'"),
  }),
  execute: async ({ expression }) => {
    // Safe math evaluation (only numbers and operators)
    const sanitized = expression.replace(/[^0-9+\-*/().% ]/g, "");
    try {
      return { expression, result: Function(`"use strict"; return (${sanitized})`)() };
    } catch {
      return { expression, error: "Invalid expression" };
    }
  },
});

// --- Guardrail ---

const safetyGuardrail = createAllemGuardrail({
  name: "safety",
  wrapGenerate: async ({ doGenerate }) => {
    console.log("[guardrail] Checking generation...");
    const result = await doGenerate();
    console.log("[guardrail] Generation complete");
    return result;
  },
});

// --- Handler ---

export async function POST(req: Request) {
  const handler = createAllemAgentHandler({
    providers: {
      google: (modelId) => google(modelId ?? "gemini-2.0-flash"),
    },
    defaultProvider: "google",
    systemPrompt:
      "You are a helpful assistant. You can check the weather and do math. " +
      "Think step by step before using tools.",
    tools: { weather: weatherTool, calculator: calculatorTool },
    maxSteps: 5,
    prepareStep: thinkThenAct(),
    middleware: safetyGuardrail,
  });

  return handler(req);
}
