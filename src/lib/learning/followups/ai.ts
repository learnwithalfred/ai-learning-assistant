import { Lesson } from "@/lib/learning/lessons/types";
import { generateText } from "@/lib/ai/ai-gateway";
import { ValidationError } from "@/lib/errors";

export async function generateFollowUpAnswer(
  lesson: Lesson,
  question: string,
): Promise<string> {
  const q = question.trim();
  if (!q) throw new ValidationError("Question is required");
  const prompt = `
You are a helpful tutor.

Use ONLY the lesson content + conversation history.
If the lesson does not contain enough info, say:
"I don't have enough info in the lesson to answer that."

Keep answers between 80–150 words.
Plain text only. No markdown.

Lesson title:
${lesson.title}

Lesson explanation:
${lesson.explanation}

Key points:
${lesson.keyPoints.map((p) => `- ${p}`).join("\n")}

User question:
${q}
`.trim();

  return generateText(prompt);
}
