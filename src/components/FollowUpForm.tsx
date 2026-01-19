"use client";

import { useFormStatus } from "react-dom";

type Props = {
  unitId: string;
  action: (formData: FormData) => Promise<void>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-3 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? "Asking…" : "Ask"}
    </button>
  );
}

function Fields({ unitId }: { unitId: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="unitId" value={unitId} />
      <input
        name="question"
        placeholder="Ask a follow-up question…"
        disabled={pending}
        className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 disabled:opacity-50"
      />
    </>
  );
}

export default function FollowUpForm({ unitId, action }: Props) {
  return (
    <form action={action} className="mt-3 flex gap-2">
      <div className="flex-1">
        <Fields unitId={unitId} />
      </div>
      <SubmitButton />
    </form>
  );
}
