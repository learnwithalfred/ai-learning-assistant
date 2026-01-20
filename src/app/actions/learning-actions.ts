"use server";
import { redirect } from "next/navigation";

import { createKnowledgeUnit } from "@/lib/learning/knowledge-units/mutations";
import { KnowledgeRequest } from "@/lib/learning/knowledge-units/types";
import { revalidatePath } from "next/cache";


export async function createKnowledgeUnitAction(formData: FormData): Promise<void> {
  const prompt = (formData.get("prompt") ?? "").toString().trim();
  const level = formData.get("level") as KnowledgeRequest["level"];

  if (!prompt) {
    throw new Error("Prompt is required")
  }
  if (prompt.length < 5) {
    throw new Error("Prompt must be at least 5 characters")
  }
  if (
    level !== "beginner" &&
    level !== "intermediate" &&
    level !== "advanced"
  ) {
    throw new Error("Invalid level")
  }

  const request: KnowledgeRequest = { prompt, level };
  const unit = await createKnowledgeUnit(request);

  revalidatePath("/learn");
  redirect(`/learn/${unit.id}`);
}
