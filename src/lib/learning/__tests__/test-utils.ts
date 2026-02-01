import { lessons } from "../lessons/store";
import { followUpMessages } from "../followups/store";

export function resetStores() {
  lessons.length = 0;
  followUpMessages.length = 0;
}
