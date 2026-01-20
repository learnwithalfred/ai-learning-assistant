import { FollowUpMessage } from "@/lib/learning/followups/types";

export default function FollowUpThread({ 
  messages 
}: { 
  messages: FollowUpMessage[] 
}) {
  if (messages.length === 0) {
    return <p className="text-gray-500">No questions yet. Ask one below!</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map(msg => (
        <div
          key={msg.id}
          className="border rounded p-3 bg-gray-50"
        >
          <p className="text-xs font-semibold text-gray-600 mb-1">
            {msg.role === "user" ? "You" : "AI Assistant"}
          </p>

          <p className="whitespace-pre-wrap text-gray-800">
            {msg.text}
          </p>

          <p className="text-[10px] text-gray-400 mt-1">
            {msg.createdAt.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
