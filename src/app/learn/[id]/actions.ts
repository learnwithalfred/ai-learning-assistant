"use server";

import { getCurrentUserId } from "@/lib/auth/getCurrentUser";
import { ExternalServiceError, ValidationError } from "@/lib/errors";
import { createFollowUp } from "@/lib/learning/followups/mutations";
import { deleteLesson, renameLesson } from "@/lib/learning/lessons/mutations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const currentUserId = await getCurrentUserId();

export async function createFollowUpAction(
  lessonId: string,
  formData: FormData,
) {
  try {
    const question = formData.get("question")?.toString().trim() ?? "";
    if (!question) throw new ValidationError("Question cannot be empty");

    await createFollowUp(lessonId, question, currentUserId);
    revalidatePath(`/learn/${lessonId}`);
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message };
    }
    if (error instanceof ExternalServiceError) {
      return { error: "There was a problem generating a response. Try again." };
    }
    throw error;
  }
}

export async function deleteLessonAction(id: string) {
  try {
    await deleteLesson(id, currentUserId);
    revalidatePath("/learn");
    redirect("/learn");
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message };
    }
    if (error instanceof ExternalServiceError) {
      return { error: "There was a problem generating a response. Try again." };
    }
    throw error;
  }
}

export async function renameLessonAction(id: string, newTitle: string) {
  try {
    await renameLesson(id, currentUserId, newTitle);
    revalidatePath("/learn");
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message };
    }
    if (error instanceof ExternalServiceError) {
      return { error: "There was a problem generating a response. Try again." };
    }
    throw error;
  }
}
