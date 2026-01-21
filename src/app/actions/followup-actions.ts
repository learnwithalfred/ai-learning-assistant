"use server";

import { revalidatePath } from "next/cache";
import { askFollowUp } from "@/lib/learning/followups/mutations";

export async function askFollowUpAction(formData: FormData): Promise<void> {
  const lessonId = (formData.get("lessonId") ?? "").toString();
  const question = (formData.get("question") ?? "").toString();


  if (!lessonId) throw new Error("Missing lessonId");
  if (question.trim().length < 1) {
    throw new Error("Question too short");
  }

  await askFollowUp(lessonId, question);

  revalidatePath(`/units/${lessonId}`);
  revalidatePath("/");
}
