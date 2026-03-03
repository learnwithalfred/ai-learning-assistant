import { prisma } from "@/lib/prisma";

export async function createNewFollowUp(data: {
  lessonId: string;
  question: string;
  answer: string;
  userId: string;
}) {
  await prisma.followUp.create({
    data,
  });
}

export async function findFollowUpsByLesson(
  lessonId: string,
  userId: string,
  limit?: number,
) {
  return prisma.followUp.findMany({
    where: {
      lessonId,
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(limit && { take: -limit }), // take last n limits if provided
  });
}
