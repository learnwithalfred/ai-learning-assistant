import { getKnowledgeUnits } from "@/lib/learning/knowledge-units/queries";
import SidebarSearch from "./SidebarSearch";

export default async function SidebarUnits() {
  const units = await getKnowledgeUnits();

  return (
    <div className="space-y-4">
      <SidebarSearch units={units} />
    </div>
  );
}
