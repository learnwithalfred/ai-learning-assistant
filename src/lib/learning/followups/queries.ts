import { prisma } from "@/lib/prisma";

export async function getFollowUps(
  lessonId: string,
  currentUserId: string,
  limit?: number,
) {
  return prisma.followUp.findMany({
    where: {
      lessonId,
      userId: currentUserId,
    },
    orderBy: {
      createdAt: "asc",
    },
    ...(limit && { take: -limit }), // take last n limits if provided
  });
}
