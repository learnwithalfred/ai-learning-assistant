import { getLessons } from "@/lib/learning/lessons/queries";
import SidebarSearch from "./SidebarSearch";

export default async function SidebarUnits() {
  const units = await getLessons();

  return (
    <div className="space-y-4">
      <SidebarSearch units={units} />
    </div>
  );
}
