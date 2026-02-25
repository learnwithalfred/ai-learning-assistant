"use server";

import { revalidatePath } from "next/cache";
import { createFollowUp } from "@/lib/learning/followups/mutations";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";
import { ExternalServiceError, ValidationError } from "@/lib/errors";

export async function createFollowUpAction(formData: FormData): Promise<{ error: string } | void> {

  try {
    const lessonId = (formData.get("lessonId") ?? "").toString();
    const question = (formData.get("question") ?? "").toString();
    const currentUserId = await getCurrentUserId()
    
    await createFollowUp(lessonId, question, currentUserId);

    revalidatePath(`/units/${lessonId}`);
    revalidatePath("/");
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message }
    }
    if (error instanceof ExternalServiceError) {
      return { error: "There was a problem generating a response. Try again." }
    }
    throw error;
  }
}
