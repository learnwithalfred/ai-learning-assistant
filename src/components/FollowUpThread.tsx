import { FollowUpMessage } from "@/lib/learning/followups/types";

type Props = {
  messages: FollowUpMessage[];
};

export default function FollowUpThread({ messages }: Props) {
  if (!messages.length) {
    return <p className="text-sm text-slate-400 dark:text-amber-100">No follow-ups yet.</p>;
  }

  return (
    <div className="mt-3 space-y-2">
      {messages.map((m) => (
        <div key={m.id} className="rounded-lg border border-slate-800 p-3">
          <p className="text-xs text-slate-400">{m.role}</p>
          <p className="mt-1 text-sm text-slate-200 whitespace-pre-wrap">{m.text}</p>
        </div>
      ))}
    </div>
  );
}
