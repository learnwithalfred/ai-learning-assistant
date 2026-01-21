"use client";

import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => void;
};

function FormFields() {
  const { pending } = useFormStatus();

  return (
    <>
      <textarea
        name="prompt"
        placeholder="What do you want to learn?"
        disabled={pending}
        className="w-full rounded-lg border p-3 text-sm disabled:opacity-50"
      />
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black mx-4 px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "Searching…" : "Teach me"}
    </button>
  );
}

export default function LessonForm({ action }: Props) {
  return (
    <form action={action} className="space-y-3 rounded-xl p-5 shadow-sm">
      <FormFields />
      <SubmitButton />
    </form>
  );
}
