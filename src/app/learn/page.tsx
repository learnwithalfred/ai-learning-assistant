export const dynamic = "force-dynamic";

import { createLessonAction } from "@/app/actions/learning-actions";
import ChatInput from "@/components/ChatInput";

export default function LearnPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-2">
          What do you want to learn today?
        </h1>
        <p className="text-gray-600 mb-8 text-3xl">
          Start a new learning session by typing below.
        </p>
      </div>

      <ChatInput
        action={createLessonAction}
        name="prompt"
        placeholder="Ask anything…"
      />
    </div>
  );
}
