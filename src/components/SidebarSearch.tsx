"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { KnowledgeUnit } from "@/lib/learning/knowledge-units/types";

export default function SidebarSearch({ units }: { units: KnowledgeUnit[] }) {
  const [query, setQuery] = useState("");

  // Configure Fuse.js only once (memo)
  const fuse = useMemo(() => {
    return new Fuse(units, {
      // Fields to search
      keys: ["topic", 'keyPoints'],
      threshold: 0.6,
      includeScore: true,
      findAllMatches: true,
      includeMatches: true
    });
  }, [units]);

  let filtered = units;

  if (query.trim() !== "") {
    const results = fuse.search(query);
    filtered = results.map(r => r.item);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search topics…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-3"
      />

      <ul className="space-y-1">
        {filtered.map(u => (
          <li key={u.id}>
            <Link
              href={`/learn/${u.id}`}
              className="block p-2 rounded hover:bg-gray-100"
            >
              {u.topic}
            </Link>
          </li>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
}
