import { Lesson } from "./types";
import { lessons } from './store'


export async function getLessons(currentUserId: string): Promise<Lesson[]> {
  if (!currentUserId) {
    throw new Error("Lesson not found");
  }
  return lessons
    .slice()
    .filter(l => l.userId === currentUserId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getLessonById(id: string, currentUserId: string): Promise<Lesson | null> {
  if (!currentUserId) {
    throw new Error("Unauthenticated");
  }
  return lessons.find((l) => l.id === id && l.userId === currentUserId) ?? null;
}
