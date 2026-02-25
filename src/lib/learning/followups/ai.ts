import { Lesson } from "../lessons/types";
// import { getFollowUps } from "./queries";
import { openaiClient } from "@/lib/ai/openai-client";
import { AI_CONFIG } from "@/lib/ai/configs";
import { ValidationError } from "@/lib/errors";

export async function generateFollowUpAnswer(
  lesson: Lesson,
  question: string,
  // currentUserId: string
): Promise<string> {
  const q = question.trim();
  if (!q) throw new ValidationError("Question is required");

  // get recent follow-ups
  // const history = await getFollowUps(lesson.id, currentUserId, 3);

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

  const response = await openaiClient.responses.create({
    model: AI_CONFIG.model,
    input: prompt,
    reasoning: AI_CONFIG.reasoning,
    max_output_tokens: AI_CONFIG.maxOutputTokens,
  });

  const answer = response.output_text?.trim();
  if (!answer) throw new ValidationError("Empty response from model");

  return answer;
}
