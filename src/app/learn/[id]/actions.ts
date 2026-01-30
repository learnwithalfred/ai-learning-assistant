"use server";

import { askFollowUp } from "@/lib/learning/followups/mutations";
import { deleteLesson, renameLesson } from "@/lib/learning/lessons/mutations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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


export async function deleteLessonAction(id: string) {
  await deleteLesson(id);
  revalidatePath("/learn");
  redirect("/learn");
}

export async function renameLessonAction(id: string, newTitle: string) {
  await renameLesson(id, newTitle);
  revalidatePath("/learn");
}