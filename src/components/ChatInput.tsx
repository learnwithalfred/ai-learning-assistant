"use client";

import { useRef } from "react";

import { useFormStatus } from "react-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

type ChatInputProps = {
  action: (formData: FormData) => void;
  name: string; // "prompt" or "question"
  placeholder: string;
};

export default function ChatInput({ action, name, placeholder }: ChatInputProps) {
  return (
    <form action={action} className="w-full">
      <ChatInputInner name={name} placeholder={placeholder} />
    </form>
  );
}

function ChatInputInner({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        name={name}
        type="text"
        placeholder={placeholder}
        disabled={pending}
        className="w-full rounded border px-3 py-2 pr-10 text-sm disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={pending}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 disabled:opacity-40"
      >
        <PaperAirplaneIcon className="h-5 w-5 rotate-270" />
      </button>
    </div>
  );
}

