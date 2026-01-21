import { followUpMessages } from "./store";
import { FollowUpMessage } from "./types";
import { getLessonById } from "../lessons/queries";
import { generateFollowUpAnswer } from "./ai";

export async function askFollowUp(
  lessonId: string,
  question: string
): Promise<void> {
  const q = question.trim();
  if (!lessonId) throw new Error("lessonId is required");
  if (!q) throw new Error("Question is required");

  const lesson = await getLessonById(lessonId);
  if (!lesson) throw new Error("Lesson not found");

  const userMessage: FollowUpMessage = {
    id: crypto.randomUUID(),
    lessonId,
    role: "user",
    text: q,
    createdAt: new Date(),
  };
  followUpMessages.push(userMessage);

  const answer = await generateFollowUpAnswer(lesson, q);

  const assistantMessage: FollowUpMessage = {
    id: crypto.randomUUID(),
    lessonId,
    role: "assistant",
    text: answer,
    createdAt: new Date(),
  };
  followUpMessages.push(assistantMessage);
}
