import * as followupRepository from "./followup.repository";
import * as lessonRepository from "../lessons/lesson.repository";

import {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
} from "@/lib/errors";
import { generateFollowUpAnswer } from "@/lib/learning/followups/ai";

export async function createFollowUp(
  lessonId: string,
  question: string,
  userId: string,
) {
  if (!userId) throw new UnauthorizedError("Unauthenticated");
  if (!lessonId) throw new ValidationError("Lesson ID is required");

  const q = question.trim();
  if (!q) throw new ValidationError("Question is required");

  const lesson = await lessonRepository.findLessonById(lessonId);

  if (!lesson || lesson.userId !== userId) {
    throw new NotFoundError("Lesson not found");
  }

  const answer = await generateFollowUpAnswer(lesson, q);

  return followupRepository.createNewFollowUp({
    lessonId,
    question: q,
    answer,
    userId,
  });
}

export async function getFollowUps(
  lessonId: string,
  currentUserId: string,
  limit?: number,
) {
  return followupRepository.findFollowUpsByLesson(lessonId, currentUserId);
}
