import { GeneratedLesson, LessonRequest } from "./types";
import { openaiClient } from "@/lib/ai/openai-client";
import { AI_CONFIG } from "@/lib/ai/configs";


function buildUserPrompt(input: LessonRequest) {
  return `Topic: ${input.prompt}`;
}

export async function generateLesson(input: LessonRequest): Promise<GeneratedLesson> {


  const response = await openaiClient.responses.create({
    model: AI_CONFIG.model,
    reasoning: AI_CONFIG.reasoning,
    max_output_tokens: AI_CONFIG.maxOutputTokens,

    // Force valid JSON output via schema
    text: {
      format: {
        type: "json_schema",
        name: "generated_lesson",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["topic", "explanation", "keyPoints"],
          properties: {
            topic: { type: "string" },
            explanation: { type: "string" },
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
    throw new Error("Model returned non-JSON output unexpectedly.");
  }

  const lesson = parsed as GeneratedLesson;

  if (
    !lesson ||
    typeof lesson.explanation !== "string" ||
    !Array.isArray(lesson.keyPoints)
  ) {
    throw new Error("JSON does not match Generated Lesson.");
  }

  return lesson;
}
