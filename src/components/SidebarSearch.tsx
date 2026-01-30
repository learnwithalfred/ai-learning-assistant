"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Lesson } from "@/lib/learning/lessons/types";
import LessonActionsMenu from "./LessonActionMenu";

export default function SidebarSearch({ lessons }: { lessons: Lesson[] }) {
  const [query, setQuery] = useState("");

  // Configure Fuse.js only once (memo)
  const fuse = useMemo(() => {
    return new Fuse(lessons, {
      // Fields to search
      keys: ["title", 'keyPoints'],
      threshold: 0.6,
      includeScore: true,
      findAllMatches: true,
      includeMatches: true
    });
  }, [lessons]);

  let filtered = lessons;

  if (query.trim() !== "") {
    const results = fuse.search(query);
    filtered = results.map(r => r.item);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search titles…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-3"
      />

      <ul className="space-y-1">
        {filtered.map(lesson => (
          <li key={lesson.id} className="flex items-center justify-between group relative">
            <Link href={`/learn/${lesson.id}`} className="flex-1 px-2 py-1 truncate">
              {lesson.title}
            </Link>

            {/* Show menu only on hover */}
            <div className="absolute left-30 ml-2 top-0 z-20 hidden group-hover:block">
              <LessonActionsMenu id={lesson.id} title={lesson.title} />
            </div>
          </li>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
}
