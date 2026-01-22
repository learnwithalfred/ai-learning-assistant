"use server";

import { askFollowUp } from "@/lib/learning/followups/mutations";
import { revalidatePath } from "next/cache";

export async function askFollowUpAction(
  lessonId: string,
  formData: FormData
) {
  const question = formData.get("question")?.toString().trim() ?? "";

  if (!question) {
    throw new Error("Question cannot be empty");
  }

  await askFollowUp(lessonId, question);
  revalidatePath(`/learn/${lessonId}`);
}
