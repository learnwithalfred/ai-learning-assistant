import KnowledgeUnitForm from "@/components/KnowledgeUnitForm";
import KnowledgeUnitList from "@/components/KnowledgeUnitList";
import { getKnowledgeUnits } from "@/lib/learning/queries";
import { createKnowledgeUnitAction } from "@/app/actions/learning-actions";

export default async function Home() {
  const units = await getKnowledgeUnits();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">AI Learning Assistant</h1>
      <p className="mt-2 text-sm text-gray-600">
        Paste anything. Get a simplified explanation, a kid-friendly version, and key points.
      </p>

      <div className="mt-6">
        <KnowledgeUnitForm action={createKnowledgeUnitAction} />
        <KnowledgeUnitList units={units} />
      </div>
    </main>
  );
}
