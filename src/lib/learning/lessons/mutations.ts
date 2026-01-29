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
  const original = prompt.trim();
  if (!original) return "Untitled Lesson";

  const lower = original.toLowerCase();

  // If the whole prompt IS a stop phrase → keep it
  if (TITLE_STOP_PHRASES.includes(lower)) {
    return original.charAt(0).toUpperCase() + original.slice(1);
  }

  // Otherwise remove stop phrases ONLY inside the prompt
  let cleaned = lower;
  for (const phrase of TITLE_STOP_PHRASES) {
    cleaned = cleaned.replace(phrase, "");
  }

  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // If cleaned becomes empty → fallback to original
  if (!cleaned) {
    return original.charAt(0).toUpperCase() + original.slice(1);
  }

  const words = cleaned.split(" ");

  // If the result is very short, use everything (minimum title length = 2)
  let candidate = cleaned;
  if (candidate.length < 2) {
    candidate = original;
  } else if (words.length > 3) {
    // Otherwise use last 3 words
    candidate = words.slice(-3).join(" ");
  }

  return candidate.charAt(0).toUpperCase() + candidate.slice(1);
}
