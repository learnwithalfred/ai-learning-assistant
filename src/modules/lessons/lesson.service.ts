import * as repository from "./lesson.repository";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";
import { extractTitle } from "@/lib/learning/utils/extractTitle";
import { generateAILesson } from "@/lib/learning/lessons/ai";
import { LessonRequest, Lesson } from "@/lib/learning/lessons/types";

export async function getLessons(userId: string): Promise<Lesson[]> {
  if (!userId) throw new UnauthorizedError("Unauthenticated");
  return repository.findLessonsByUser(userId);
}

export async function getLessonById(id: string, userId: string) {
  if (!id) throw new ValidationError("Lesson ID is required");
  const lesson = await repository.findLessonById(id);

  if (!lesson || lesson.userId !== userId) {
    throw new NotFoundError("Lesson not found");
  }
  return lesson;
}

export async function createLesson(input: LessonRequest, userId: string) {
  if (!userId) throw new UnauthorizedError("Unauthenticated");
  const prompt = input.prompt.trim();

  if (!prompt) throw new ValidationError("Prompt is required");
  if (prompt.length < 3)
    throw new ValidationError("Prompt must be at least 3 characters");

  const lesson = await generateAILesson({ prompt });
  const title = await extractTitle(prompt);

  return repository.createNewLesson({
    id: crypto.randomUUID(),
    title,
    originalPrompt: prompt,
    explanation: lesson.explanation,
    keyPoints: lesson.keyPoints,
    userId: userId,
  });
}

export async function deleteLesson(id: string, userId: string) {
  const lesson = await repository.findLessonById(id);

  if (!lesson || lesson.userId !== userId) {
    throw new NotFoundError("Lesson not found");
  }

  await repository.deleteLessonById(id);
}

export async function renameLesson(
  id: string,
  userId: string,
  newTitle: string,
) {
  const lesson = await repository.findLessonById(id);

  if (!lesson || lesson.userId !== userId) {
    throw new NotFoundError("Lesson not found");
  }

  await repository.updateLessonTitleById(id, newTitle);
}
