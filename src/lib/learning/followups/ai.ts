import { KnowledgeUnit } from "../knowledge-units/types";
import { AI_CONFIG } from "@/lib/ai/configs";
import { openaiClient } from "@/lib/ai/openai-client";


function buildPrompt(unit: KnowledgeUnit, question: string) {
  const keyPoints = unit.keyPoints.map((p) => `- ${p}`).join("\n");

  return `
You are a helpful tutor.

Use ONLY the lesson content below to answer the user's question.
If the lesson does not contain enough info, say: "I don't have enough info in the lesson to answer that."

Constraints:
- Plain text only
- No markdown
- 100–160 words

Lesson topic: ${unit.topic}

Simplified explanation:
${unit.simplifiedExplanation}

Explain like I'm 5:
${unit.childExplanation}

Key points:
${keyPoints}

User question:
${question}
`.trim();
}

export async function generateFollowUpAnswer(
  unit: KnowledgeUnit,
  question: string
): Promise<string> {

  const q = question.trim();
  if (!q) throw new Error("Question is required");

  const response = await openaiClient.responses.create({
    model: AI_CONFIG.model,
    input: buildPrompt(unit, q),
    reasoning: AI_CONFIG.reasoning,
    max_output_tokens: AI_CONFIG.maxOutputTokens,
  });

  const text = response.output_text?.trim();
  if (!text) throw new Error("Empty response from model");

  return text;
}
