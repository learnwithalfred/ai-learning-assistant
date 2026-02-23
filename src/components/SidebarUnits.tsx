import { getLessons } from "@/lib/learning/lessons/queries";
import SidebarSearch from "./SidebarSearch";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";

export default async function SidebarUnits() {
  const currentUserId = await getCurrentUserId();
  const lessons = await getLessons(currentUserId);

  return (
    <div className="space-y-4">
      <SidebarSearch lessons={lessons} />
    </div>
  );
}
