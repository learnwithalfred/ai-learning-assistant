import { FollowUpMessage } from "./types";
import { followUpMessages } from "./store";

export async function getFollowUpsForUnit(
  unitId: string
): Promise<FollowUpMessage[]> {
  return followUpMessages
    .filter((msg) => msg.unitId === unitId)
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);
}
