import { prisma } from "@/lib/prisma";

export async function findLessonsByUser(userId: string) {
  return prisma.lesson.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function findLessonById(id: string) {
  return prisma.lesson.findUnique({ where: { id } });
}

export async function createNewLesson(data: {
  id: string;
  title: string;
  originalPrompt: string;
  explanation: string;
  keyPoints: string[];
  userId: string;
}) {
  return prisma.lesson.create({ data });
}

export async function deleteLessonById(id: string) {
  return prisma.lesson.delete({ where: { id } });
}

export async function updateLessonTitleById(id: string, title: string) {
  return prisma.lesson.update({
    where: { id },
    data: { title },
  });
}
