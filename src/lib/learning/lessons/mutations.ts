import { generateAILesson } from "./ai";
import { TITLE_STOP_PHRASES } from "./constants";
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


export async function extractTitle(prompt: string): Promise<string> {
  if (!prompt.trim()) return "Untitled Lesson";

  // remove stop phrases


  let cleaned = prompt.toLowerCase().trim();

  for (const phrase of TITLE_STOP_PHRASES) {
    cleaned = cleaned.replace(phrase, "");
  }

  cleaned = cleaned.replace(/\s+/g, " ").trim();

  if (!cleaned) return "Untitled Lesson";

  const words = cleaned.split(" ");
  const trimmed = words.slice(-3).join(" ");
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
