"use client";

import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => void;
};

export default function FollowUpForm({ action }: Props) {
  const { pending } = useFormStatus();

  return (
    <form
      action={action}
      className="flex items-center gap-3 w-full border-t px-4 py-4 bg-white"
    >
      <textarea
        name="question"
        placeholder="Ask a follow-up question..."
        autoFocus
        disabled={pending}
        className="
          flex-1 resize-none rounded-md px-3 py-2
          bg-gray-100 dark:bg-gray-800
          text-sm focus:outline-none
          disabled:opacity-50
        "
        rows={2}
      />

      <button
        type="submit"
        disabled={pending}
        className="
          rounded-md bg-blue-600 text-white px-4 py-2 text-sm
          disabled:bg-blue-400 disabled:cursor-not-allowed
        "
      >
        {pending ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}
