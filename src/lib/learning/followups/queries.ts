import { followUpMessages } from "./store";
import { FollowUpMessage } from "./types";

export async function getFollowUpsForLesson(
  lessonId: string
): Promise<FollowUpMessage[]> {
  return followUpMessages
    .filter(msg => msg.lessonId === lessonId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
