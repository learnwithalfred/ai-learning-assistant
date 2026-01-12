import { generateExplanation } from "./ai";
import { knowledgeUnits } from "./store";
import { KnowledgeRequest, KnowledgeUnit } from "./types";

export async function createKnowledgeUnit(
  input: KnowledgeRequest
): Promise<KnowledgeUnit> {

  const newKnowledgeUnit: KnowledgeUnit = {
    id :crypto.randomUUID(),
    topic: input.prompt,
    originalPrompt: input.prompt,
    explanation: await generateExplanation(input),
    level: input.level,
    createdAt: new Date()
  }

  knowledgeUnits.push(newKnowledgeUnit)
  return newKnowledgeUnit;
}