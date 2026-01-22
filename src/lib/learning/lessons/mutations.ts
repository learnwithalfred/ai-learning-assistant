import { generateAILesson } from "./ai";
import { lessons } from "./store";
import { LessonRequest, Lesson } from "./types";


export async function createLesson(
  input: LessonRequest
): Promise<Lesson> {
  const prompt = input.prompt.trim();

  if (!prompt) throw new Error("Prompt is required");
  if (prompt.length < 5) throw new Error("Prompt must be at least 5 characters");

  const lesson = await generateAILesson({ prompt });

  const newLesson: Lesson = {
    id: crypto.randomUUID(),
    title: prompt,
    originalPrompt: prompt,
    explanation: lesson.explanation,
    keyPoints: lesson.keyPoints,
    createdAt: new Date(),
  };

  lessons.push(newLesson);
  return newLesson;
}
