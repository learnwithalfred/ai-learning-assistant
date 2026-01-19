import { followUpMessages } from "./store";
import { FollowUpMessage } from "./types";
import { getKnowledgeUnitById } from "../knowledge-units/queries";
import { generateFollowUpAnswer } from "./ai";

export async function askFollowUp(
  unitId: string,
  question: string
): Promise<void> {
  const q = question.trim();
  if (!unitId) throw new Error("unitId is required");
  if (!q) throw new Error("Question is required");

  const unit = await getKnowledgeUnitById(unitId);
  if (!unit) throw new Error("KnowledgeUnit not found");

  const userMessage: FollowUpMessage = {
    id: crypto.randomUUID(),
    unitId,
    role: "user",
    text: q,
    createdAt: new Date(),
  };
  followUpMessages.push(userMessage);

  const answer = await generateFollowUpAnswer(unit, q);

  const assistantMessage: FollowUpMessage = {
    id: crypto.randomUUID(),
    unitId,
    role: "assistant",
    text: answer,
    createdAt: new Date(),
  };
  followUpMessages.push(assistantMessage);
}
