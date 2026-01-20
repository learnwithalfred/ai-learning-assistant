import { followUpMessages } from "./store";
import { FollowUpMessage } from "./types";

export async function getFollowUpsForUnit(
  unitId: string
): Promise<FollowUpMessage[]> {
  return followUpMessages
    .filter(msg => msg.unitId === unitId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
