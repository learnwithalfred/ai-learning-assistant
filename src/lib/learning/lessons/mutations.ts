import { extractTitle } from "../utils/extractTitle";
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

  const title = await extractTitle(prompt);


  const newLesson: Lesson = {
    id: crypto.randomUUID(),
    title,
    originalPrompt: prompt,
    explanation: lesson.explanation,
    keyPoints: lesson.keyPoints,
    createdAt: new Date(),
  };

  lessons.push(newLesson);
  return newLesson;
}



export async function deleteLesson(id: string): Promise<void> {
  const index = lessons.findIndex(l => l.id === id);
  if (index === -1) throw new Error("Lesson not found");

  lessons.splice(index, 1);
}


export async function renameLesson(id: string, newTitle: string): Promise<void> {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) throw new Error("Lesson not found");

  const cleaned = newTitle.trim();
  if (!cleaned) throw new Error("Title cannot be empty");

  lesson.title = cleaned;
}
