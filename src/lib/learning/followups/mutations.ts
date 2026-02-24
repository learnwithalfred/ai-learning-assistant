import { prisma } from "@/lib/prisma";
import { getLessonById } from "../lessons/queries";
import { generateFollowUpAnswer } from "./ai";

export async function createFollowUp(
  lessonId: string,
  question: string,
  currentUserId: string
): Promise<void> {
  if (!lessonId) throw new Error("lessonId is required");

  const q = question.trim();
  if (!q) throw new Error("Question is required");

  const lesson = await getLessonById(lessonId, currentUserId);
  if (!lesson) throw new Error("Lesson not found");

  const answer = await generateFollowUpAnswer(lesson, q);

  await prisma.followUp.create({
    data: {
      lessonId,
      userId: currentUserId,
      question: q,
      answer,
    },
  });
}