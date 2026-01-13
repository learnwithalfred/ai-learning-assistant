import { generateExplanation } from "./ai";
import { knowledgeUnits } from "./store";
import { KnowledgeRequest, KnowledgeUnit } from "./types";

function isValidLevel(level: string): level is KnowledgeRequest["level"] {
  return level === "beginner" || level === "intermediate" || level === "advanced";
}

export async function createKnowledgeUnit(
  input: KnowledgeRequest
): Promise<KnowledgeUnit> {

  const prompt = input.prompt.trim();

  if (!prompt) {
    throw new Error("Prompt is required");
  }
  if (prompt.length < 10) {
    throw new Error("Prompt must be at least 10 characters");
  }
  if (!isValidLevel(input.level)) {
    throw new Error("Invalid level");
  }

  const explanation = await generateExplanation({ ...input, prompt });

  const newKnowledgeUnit: KnowledgeUnit = {
    id: crypto.randomUUID(),
    topic: prompt,
    originalPrompt: prompt,
    explanation,
    level: input.level,
    createdAt: new Date(),
  };

  knowledgeUnits.push(newKnowledgeUnit);
  return newKnowledgeUnit;
}
