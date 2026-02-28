export const dynamic = "force-dynamic";

import { createLessonAction } from "@/app/actions/learning-actions";
import ChatInput from "@/components/ChatInput";

export const metadata = {
  title: "Your Lessons | AI Learning App",
};

export default function LearnPage() {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold mb-2">
          What do you want to learn today?
        </h1>
        <p className="text-gray-600 text-xl">
          Start a new learning session by typing below
        </p>
      </div>

      <div className="mt-8 w-full max-w-xl">
        <ChatInput
          action={createLessonAction}
          name="prompt"
          placeholder="Ask anything…"
        />
      </div>
    </div>
  );
}
