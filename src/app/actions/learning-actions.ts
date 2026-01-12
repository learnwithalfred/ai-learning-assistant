"use server";

import { revalidatePath } from "next/cache";
import { createKnowledgeUnit } from "@/lib/learning/mutations";
import { KnowledgeRequest } from "@/lib/learning/types";

export async function createKnowledgeUnitAction(formData: FormData): Promise<void> {
  const prompt = (formData.get("prompt") ?? "").toString().trim();
  const level = formData.get("level") as KnowledgeRequest["level"];

  if (!prompt) return; // later: return errors properly

  const request: KnowledgeRequest = { prompt, level };

  await createKnowledgeUnit(request);

  revalidatePath("/");
}
