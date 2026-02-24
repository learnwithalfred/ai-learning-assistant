import { prisma } from "@/lib/prisma";
import { Lesson } from "./types";


export async function getLessons(currentUserId: string): Promise<Lesson[]> {
  if (!currentUserId) {
    throw new Error("Lesson not found");
  }
  const lessons = await prisma
    .lesson
    .findMany({
      where: { userId: currentUserId },
      orderBy: { createdAt: "desc" }
    });

  return lessons;
}


export async function getLessonById(
  id: string,
  currentUserId: string)
  : Promise<Lesson | null> {
  if (!currentUserId) {
    throw new Error("Unauthenticated");
  }

  const lesson = await prisma.lesson.findUnique({ where: { id } });

  if (!lesson || lesson.userId !== currentUserId) {
    throw new Error("Lesson not found");
  }

  return lesson;
}

