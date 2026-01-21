import Link from "next/link";
import SidebarUnits from "@/components/SidebarUnits";
import { PencilSquareIcon } from "@heroicons/react/24/solid";


export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4 flex flex-col gap-4">
        <Link
          href="/learn"
          className="flex items-center gap-2 py-2 text-gray-800 hover:bg-gray-100"
        >
          <PencilSquareIcon className="h-5 w-5" />
          <span>New Chat</span>
        </Link>
        <SidebarUnits />
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
