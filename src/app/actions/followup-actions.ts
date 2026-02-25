"use server";

import { revalidatePath } from "next/cache";
import { createFollowUp } from "@/lib/learning/followups/mutations";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";

export async function createFollowUpAction(formData: FormData): Promise<void> {
  const lessonId = (formData.get("lessonId") ?? "").toString();
  const question = (formData.get("question") ?? "").toString();
  const currentUserId = await getCurrentUserId()


  if (!lessonId) throw new Error("Missing lessonId");
  if (question.trim().length < 1) {
    throw new Error("Question too short");
  }

  await createFollowUp(lessonId, question, currentUserId);

  revalidatePath(`/units/${lessonId}`);
  revalidatePath("/");
}
