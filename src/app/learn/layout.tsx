import Link from "next/link";
import SidebarUnits from "@/components/SidebarUnits";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4 flex flex-col gap-4">

        <Link
          href="/learn"
          className="block px-3 py-2 bg-blue-600 text-white rounded text-center"
        >
          New Chat
        </Link>
        <SidebarUnits />

      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
