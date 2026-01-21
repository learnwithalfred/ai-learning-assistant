import { Lesson } from "./types";
import { lessons } from './store'


export async function getLessons(): Promise<Lesson[]> {
  return lessons
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  return lessons.find((l) => l.id === id) ?? null;
}
