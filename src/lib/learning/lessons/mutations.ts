import { prisma } from "@/lib/prisma";
import { extractTitle } from "@/lib/learning/utils/extractTitle";
import { generateAILesson } from "./ai";
import { LessonRequest, Lesson } from "./types";
import { NotFoundError, ValidationError } from "@/lib/errors";


export async function createLesson(
  input: LessonRequest,
  currentUserId: string
): Promise<Lesson> {
  const prompt = input.prompt.trim();

  if (!prompt) throw new ValidationError("Prompt is required");
  if (prompt.length < 3) throw new ValidationError("Prompt must be at least 3 characters");

  const lesson = await generateAILesson({ prompt });
  const title = await extractTitle(prompt);


  const saved = await prisma.lesson.create({
    data: {
      id: crypto.randomUUID(),
      title,
      originalPrompt: prompt,
      explanation: lesson.explanation,
      keyPoints: lesson.keyPoints,
      userId: currentUserId,
    },
  });
  return saved;
}


export async function deleteLesson(id: string, currentUserId: string): Promise<void> {

  const lesson = await prisma.lesson.findUnique({ where: { id } });

  if (!lesson || lesson.userId !== currentUserId) {
    throw new NotFoundError("Lesson not found");
  }

  await prisma.lesson.delete({ where: { id } });
}


export async function renameLesson(id: string, currentUserId: string, newTitle: string): Promise<void> {
  const lesson = await prisma.lesson.findUnique({ where: { id } });

  if (!lesson || lesson.userId !== currentUserId) {
    throw new NotFoundError("Lesson not found");
  }

  await prisma.lesson.update({
    where: { id },
    data: { title: newTitle },
  });
}
