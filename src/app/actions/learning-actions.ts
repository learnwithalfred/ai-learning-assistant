"use server";
import { redirect } from "next/navigation";

import { createLesson } from "@/lib/learning/lessons/mutations";
import { LessonRequest } from "@/lib/learning/lessons/types";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";
import { ExternalServiceError, ValidationError } from "@/lib/errors";


export async function createLessonAction(formData: FormData): Promise<{ error: string } | void> {

  try {
    const prompt = (formData.get("prompt") ?? "").toString().trim();
    if (!prompt) throw new ValidationError("Prompt cannot be empty.");
    if (prompt.length < 5) throw new ValidationError("Prompt must be at least 5 characters")

    const currentUserId = await getCurrentUserId();
    const request: LessonRequest = { prompt };
    const unit = await createLesson(request, currentUserId);

    revalidatePath("/learn");
    redirect(`/learn/${unit.id}`);
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