import KnowledgeUnitForm from "@/components/KnowledgeUnitForm";
import KnowledgeUnitList from "@/components/KnowledgeUnitList";
import { createKnowledgeUnitAction } from "@/app/actions/learning-actions";
import { getKnowledgeUnits } from "@/lib/learning/queries";

export default async function Home() {
  const KnowledgeUnits = await getKnowledgeUnits();
  return (
    <div>
      <KnowledgeUnitForm action={createKnowledgeUnitAction} />
      <KnowledgeUnitList units={KnowledgeUnits} />
    </div>
  );
}
