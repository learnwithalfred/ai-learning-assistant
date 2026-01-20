import { getKnowledgeUnitById } from "@/lib/learning/knowledge-units/queries";
import { getFollowUpsForUnit } from "@/lib/learning/followups/queries";
import FollowUpForm from "@/components/FollowUpForm";
import { askFollowUpAction } from "./actions";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = await getKnowledgeUnitById(id);
  const followups = await getFollowUpsForUnit(id);

  if (!unit) return <div>Topic not found.</div>;

  return (
    <div className="flex flex-col h-full">

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        <h1 className="text-2xl font-bold">{unit.topic}</h1>
        <p className="text-sm text-gray-500">
          Level: {unit.level} • {unit.createdAt.toLocaleString()}
        </p>

        {/* Lesson sections */}
        <section>
          <h2 className="font-semibold">Simplified explanation</h2>
          <p className="mt-2 whitespace-pre-line">{unit.simplifiedExplanation}</p>
        </section>

        <section>
          <h2 className="font-semibold mt-6">Explain like I’m 5</h2>
          <p className="mt-2 whitespace-pre-line">{unit.childExplanation}</p>
        </section>

        <section>
          <h2 className="font-semibold mt-6">Key points</h2>
          <ul className="list-disc ml-6 mt-2">
            {unit.keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        {/* Follow-up messages */}
        <section className="mt-8">
          {followups.map((msg) => (
            <div key={msg.id} className="mb-4">
              <p className="font-bold">{msg.role === "user" ? "You:" : "AI:"}</p>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          ))}
        </section>

      </div>

      <FollowUpForm action={askFollowUpAction.bind(null, id)} />

    </div>
  );
}
