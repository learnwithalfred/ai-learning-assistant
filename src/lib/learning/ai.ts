import OpenAI from "openai";
import { GeneratedLesson, KnowledgeRequest } from "./types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildUserPrompt(input: KnowledgeRequest) {
  return `Topic: ${input.prompt}\nLevel: ${input.level}`;
}

export async function generateLesson(input: KnowledgeRequest): Promise<GeneratedLesson> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing on the server.");
  }

  const response = await client.responses.create({
    model: "gpt-5-nano-2025-08-07",
    reasoning: { effort: "low" },
    max_output_tokens: 900,

    // Force valid JSON output via schema
    text: {
      format: {
        type: "json_schema",
        name: "generated_lesson",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["topic", "simplifiedExplanation", "childExplanation", "keyPoints"],
          properties: {
            topic: { type: "string" },
            simplifiedExplanation: { type: "string" },
            childExplanation: { type: "string" },
            keyPoints: {
              type: "array",
              items: { type: "string" },
              maxItems: 5,
            },
          },
        },
      },
    },

    input: [
      {
        role: "system",
        content:
          "You are a teacher. Produce helpful, accurate explanations. " +
          "Follow the JSON schema exactly. No extra keys.",
      },
      {
        role: "user",
        content: buildUserPrompt(input),
      },
    ],
  });

  // With json_schema format, output_text should be valid JSON.
  const raw = response.output_text?.trim();
  if (!raw) throw new Error("Empty response from model.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Extremely rare now, but keep a good error.
    throw new Error("Model returned non-JSON output unexpectedly.");
  }

  // Minimal runtime check (you can keep your isGeneratedLesson if you want)
  const lesson = parsed as GeneratedLesson;

  if (
    !lesson ||
    typeof lesson.topic !== "string" ||
    typeof lesson.simplifiedExplanation !== "string" ||
    typeof lesson.childExplanation !== "string" ||
    !Array.isArray(lesson.keyPoints)
  ) {
    throw new Error("JSON does not match GeneratedLesson.");
  }

  return lesson;
}
