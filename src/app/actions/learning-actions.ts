"use server";
import { redirect } from "next/navigation";

import { createLesson } from "@/lib/learning/lessons/mutations";
import { LessonRequest } from "@/lib/learning/lessons/types";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";


export async function createLessonAction(formData: FormData): Promise<void> {
  const prompt = (formData.get("prompt") ?? "").toString().trim();
  const currentUserId = await getCurrentUserId();

  if (!prompt) {
    throw new Error("Prompt is required")
  }
  if (prompt.length < 5) {
    throw new Error("Prompt must be at least 5 characters")
  }
  const request: LessonRequest = { prompt };
  const unit = await createLesson(request, currentUserId);

  revalidatePath("/learn");
  redirect(`/learn/${unit.id}`);
}
