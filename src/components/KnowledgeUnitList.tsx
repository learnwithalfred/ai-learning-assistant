import { KnowledgeUnit } from "@/lib/learning/knowledge-units/types";

type Props = {
  units: KnowledgeUnit[];
};

export default function KnowledgeUnitList({ units }: Props) {
  if (!units.length) {
    return (
      <div className="mt-6 rounded-lg border p-4 text-sm text-gray-600 dark:text-gray-100">
        No KnowledgeUnits yet. Paste something and click “Teach me”.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {units.map((unit) => (
        <article key={unit.id} className="rounded-xl border p-5 shadow-sm">
          <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-lg font-semibold">{unit.topic}</h2>
            <div className="text-xs text-gray-600 dark:text-gray-100">
              <span className="rounded-full border px-2 py-0.5">
                {unit.level}
              </span>
              <span className="ml-2">
                {unit.createdAt.toLocaleString()}
              </span>
            </div>
          </header>

          <section className="mt-4">
            <h3 className="mt-4 text-sm font-semibold">
              Simplified explanation</h3>
            <p className="mt-2 text-sm leading-6 text-gray-800 dark:text-gray-100">
              {unit.simplifiedExplanation}
            </p>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-semibold">Explain like I’m 5</h3>
            <p className="mt-2 text-sm leading-6 text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
              {unit.childExplanation}
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
