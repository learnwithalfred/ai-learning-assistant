"use server";

import { revalidatePath } from "next/cache";
import { askFollowUp } from "@/lib/learning/followups/mutations";

export async function askFollowUpAction(formData: FormData): Promise<void> {
  const unitId = (formData.get("unitId") ?? "").toString();
  const question = (formData.get("question") ?? "").toString();


  if (!unitId) throw new Error("Missing unitId");
  if (question.trim().length < 1) {
    throw new Error("Question too short");
  }

  await askFollowUp(unitId, question);

  revalidatePath(`/units/${unitId}`);
  revalidatePath("/");
}
