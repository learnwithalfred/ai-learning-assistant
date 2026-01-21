import LessonForm from "@/components/LessonForm";
import { createLessonAction } from "../actions/learning-actions";

export default function LearnPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">
        What do you want to learn today?
      </h1>
      <p className="text-gray-600 mb-8">
        Start a new learning session by typing below.
      </p>

      <div className="w-full">
        <LessonForm action={createLessonAction} />
      </div>
    </div>
  );
}
