import { followUpMessages } from "./store";
import { FollowUpMessage } from "./types";

export async function getFollowUpsForLesson(
  lessonId: string
): Promise<FollowUpMessage[]> {
  return followUpMessages
    .filter(msg => msg.lessonId === lessonId)
    .slice()
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function getRecentFollowUps(
  lessonId: string, limit = 3
): Promise<FollowUpMessage[]> {
  return followUpMessages
    .filter(m => m.lessonId === lessonId)
    .slice()
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .slice(-limit);
}
