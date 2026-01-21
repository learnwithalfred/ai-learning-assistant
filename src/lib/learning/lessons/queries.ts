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


// Render summaries instead of every unit
// export async function getLessonSummaries(): Promise<LessonSammary[]> {
//   return lessons.slice()
//     .map(unit => ({
//       id: unit.id,
//       topic: unit.topic,
//       keyPoints: unit.keyPoints,
//       createdAt: unit.createdAt,
//     }))
//     .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
// }
