import { Lesson } from "@/lib/learning/lessons/types";

type Props = {
  lessons: Lesson[];
};

export default function LessonList({ lessons }: Props) {
  if (!lessons.length) {
    return (
      <div className="mt-6 rounded-lg border p-4 text-sm text-gray-600 dark:text-gray-100">
        No Lessons yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {lessons.map((unit) => (
        <article key={unit.id} className="rounded-xl border p-5 shadow-sm">
          <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg font-semibold">{unit.title}</h2>
            <div className="text-xs text-gray-600 dark:text-gray-100">
              <span className="ml-2">
                {unit.createdAt.toLocaleString()}
              </span>
            </div>
          </header>

          <section className="mt-4">
            <h3 className="mt-4 text-sm font-semibold">
              Explanation</h3>
            <p className="mt-2 text-sm leading-6 text-gray-800 dark:text-gray-100">
              {unit.explanation}
            </p>
          </section>


          <section className="mt-4">
            <h3 className="text-sm font-semibold">Key points</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800 dark:text-gray-100">
              {unit.keyPoints.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </section>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-100">
              Show original prompt
            </summary>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-100 whitespace-pre-wrap">
              {unit.originalPrompt}
            </p>
          </details>
        </article>
      ))}
    </div>
  );
}
