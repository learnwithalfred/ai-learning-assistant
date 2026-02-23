import { getLessonById } from "@/lib/learning/lessons/queries";
import { getFollowUpsForLesson } from "@/lib/learning/followups/queries";
import { askFollowUpAction } from "./actions";
import ChatInput from "@/components/ChatInput";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {

  const currentUserId = await getCurrentUserId();
  const { id } = await params;
  const lesson = await getLessonById(id, currentUserId);
  const followups = await getFollowUpsForLesson(id);

  if (!lesson) return <div>Title not found.</div>;

  return (
    <div className="flex flex-col h-full">

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="text-sm text-gray-500">{lesson.createdAt.toLocaleString()}
        </p>

        {/* Lesson sections */}
        <section>
          <h2 className="font-semibold">Explanation</h2>
          <p className="mt-2 whitespace-pre-line">{lesson.explanation}</p>
        </section>

        <section>
          <h2 className="font-semibold mt-6">Key points</h2>
          <ul className="list-disc ml-6 mt-2">
            {lesson.keyPoints.map((p, i) => (
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
      <ChatInput
        action={askFollowUpAction.bind(null, id)} name="question"
        placeholder="Ask a follow-up question…"
      />

    </div>
  );
}
