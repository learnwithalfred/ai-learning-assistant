"use client";

import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => Promise<void>;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "Searching for answers…" : "Teach me"}
    </button>
  );
}

export default function KnowledgeUnitForm({ action }: Props) {
  const { pending } = useFormStatus();

  return (
    <form action={action} className="space-y-3 rounded-xl border p-5">
      <textarea
        name="prompt"
        placeholder="What do you want to learn?"
        disabled={pending}
        className="w-full rounded border p-3 text-sm disabled:opacity-50"
      />

      <select
        name="level"
        defaultValue="beginner"
        disabled={pending}
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <SubmitButton />
    </form>
  );
}
