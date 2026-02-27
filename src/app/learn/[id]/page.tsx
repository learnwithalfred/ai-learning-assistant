export const dynamic = "force-dynamic";

import { getLessonById } from "@/lib/learning/lessons/queries";
import { getFollowUps } from "@/lib/learning/followups/queries";
import { createFollowUpAction } from "./actions";
import ChatInput from "@/components/ChatInput";
import { getCurrentUserId } from "@/lib/auth/getCurrentUser";

type PageProps = {
  params: { id: string };
};

/**
 * Shared loader for full lesson page data
 */
async function getLessonPageData(id: string) {
  const currentUserId = await getCurrentUserId();

  const [lesson, followups] = await Promise.all([
    getLessonById(id, currentUserId),
    getFollowUps(id, currentUserId),
  ]);

  return { lesson, followups };
}

/**
 * Lightweight loader for metadata only
 */
async function getLessonOnly(id: string) {
  const currentUserId = await getCurrentUserId();
  return getLessonById(id, currentUserId);
}

export async function generateMetadata({ params }: PageProps) {
  const lesson = await getLessonOnly(params.id);

  if (!lesson) {
    return {
      title: "Lesson Not Found | AI Learning App",
    };
  }

  return {
    title: `${lesson.title} | AI Learning App`,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { lesson, followups } = await getLessonPageData(params.id);

  if (!lesson) {
    return <div>Title not found.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
        {/* Lesson Question */}
        <div className="flex justify-end">
          <div className="max-w-[75%] bg-blue-100 text-blue-900 px-4 py-3 rounded-2xl rounded-br-sm shadow-sm">
            <p className="text-sm whitespace-pre-line leading-relaxed">
              {lesson.originalPrompt}
            </p>
          </div>
        </div>

        {/* Lesson Answer */}
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm space-y-4">
            
            <p className="text-sm whitespace-pre-line leading-relaxed">
              {lesson.explanation}
            </p>

            {lesson.keyPoints.length > 0 && (
              <div>
                <p className="font-semibold text-sm mb-2">Key Points</p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {lesson.keyPoints.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-gray-400 pt-2">
              {lesson.createdAt.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Follow-up messages */}
        <section className="mt-8 space-y-6">
          {followups.map((item) => (
            <div key={item.id} className="space-y-3">
              
              {/* User Question */}
              <div className="flex justify-end">
                <div className="max-w-[75%] bg-blue-100 text-blue-900 px-4 py-3 rounded-2xl rounded-br-sm shadow-sm">
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {item.question}
                  </p>
                </div>
              </div>

              {/* Assistant Answer */}
              <div className="flex justify-start">
                <div className="max-w-[75%] bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </section>
      </div>

      <ChatInput
        action={createFollowUpAction.bind(null, params.id)}
        name="question"
        placeholder="Ask a follow-up question…"
      />
    </div>
  );
}