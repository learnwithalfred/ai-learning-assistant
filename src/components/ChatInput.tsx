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
  const { pending } = useFormStatus();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={action} className="border-t p-3 w-full">
      <div className="relative">
        <input
          ref={inputRef}
          autoFocus
          name={name}
          type="text"
          placeholder={placeholder}
          disabled={pending}
          className="w-full rounded border px-3 py-2 pr-10 text-sm disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              const value = (e.currentTarget.value || "").trim();

              if (!value) {
                e.preventDefault();
                return;
              }
            }
          }}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={pending}
          onClick={(e) => {
            const value = inputRef.current?.value.trim();
            if (!value) {
              e.preventDefault();
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-black disabled:opacity-40"
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-270" />
        </button>
      </div>
    </form>
  );
}
