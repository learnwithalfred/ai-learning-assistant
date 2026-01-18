"use client";

import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => Promise<void>;
};

function FormFields() {
  const { pending } = useFormStatus();

  return (
    <>
      <textarea
        name="prompt"
        placeholder="What do you want to learn?"
        disabled={pending}
        className="min-h-[120px] w-full rounded-lg border p-3 text-sm disabled:opacity-50"
      />

      <select
        name="level"
        defaultValue="beginner"
        disabled={pending}
        className="rounded-lg border px-3 py-2 text-sm bg-white text-black"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "Searhing…" : "Teach me"}
    </button>
  );
}

export default function KnowledgeUnitForm({ action }: Props) {
  return (
    <form action={action} className="space-y-3 rounded-xl border p-5 shadow-sm">
      <FormFields />
      <SubmitButton />
    </form>
  );
}
