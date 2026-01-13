"use server";


import { revalidatePath } from "next/cache";
import { createKnowledgeUnit } from "@/lib/learning/mutations";
import { KnowledgeRequest } from "@/lib/learning/types";

export async function createKnowledgeUnitAction(formData: FormData): Promise<void> {
  const prompt = (formData.get("prompt") ?? "").toString().trim();
  const level = formData.get("level") as KnowledgeRequest["level"];

  if (!prompt) {
    throw new Error("Prompt is required")
  }
  if (prompt.length < 10) {
    throw new Error("Prompt must be at least 10 characters")
  }
  if (
    level !== "beginner" &&
    level !== "intermediate" &&
    level !== "advanced"
  ) {
    throw new Error("Invalid level")
  }

  const request: KnowledgeRequest = { prompt, level };
  await createKnowledgeUnit(request);
  revalidatePath("/");
}
