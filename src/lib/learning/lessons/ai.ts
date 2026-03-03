import { generateText } from "@/lib/ai/ai-gateway";
import { LessonRequest, GeneratedLesson } from "./types";
import { ExternalServiceError } from "@/lib/errors";

export async function generateAILesson(
  input: LessonRequest,
): Promise<GeneratedLesson> {
  const prompt = `
You are an expert teacher.

The user wants to learn about the following topic:
"${input.prompt}"

Your job:
1. Produce one clear explanation (120–200 words).
2. Extract 3–6 key points only.
3. Return VALID JSON ONLY. No extra text.

JSON FORMAT (required):
{
  "explanation": "string",
  "keyPoints": ["string", ...]
}

Rules:
- Plain text only. No markdown.
- No headings.
- No questions.
- Explanation must be 120–200 words.
- keyPoints must be a short list of bullet-style strings.
`.trim();

  const text = await generateText(prompt);

  let result: unknown;

  try {
    result = JSON.parse(text);
  } catch {
    throw new ExternalServiceError("Model did not return valid JSON");
  }

  function isGeneratedLesson(value: unknown): value is GeneratedLesson {
    if (typeof value !== "object" || value === null) return false;

    const obj = value as Record<string, unknown>;

    return (
      typeof obj.explanation === "string" &&
      Array.isArray(obj.keyPoints) &&
      obj.keyPoints.every((p) => typeof p === "string")
    );
  }

  if (!isGeneratedLesson(result)) {
    throw new ExternalServiceError("JSON shape does not match GeneratedLesson");
  }

  return result;
}
