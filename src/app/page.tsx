"use client"

import { useState } from "react";
import SnippetList from "../components/SnippetList";
import TagList from "../components/TagList";
import { FaGithub } from "react-icons/fa";

const DEFAULT_TAGS = [
  "Web Development",
  "Web Design",
  "Javascript",
  "React-Redux",
  "Typescript",
  "Database",
  "Package",
  "Git",
  "Network"
];

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="w-screen max-w-none bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 py-2 px-2 text-center text-white text-sm font-medium select-none">
        Snippfy is an open-source project that helps developers quickly find and share code solutions for common errors and best practices.
      </div>
      <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col items-center p-6 bg-pattern">
        <header className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold tracking-tight">Snippfy</h1>
            <a
              href="https://github.com/chefharun/snippfy"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white font-semibold shadow hover:bg-zinc-800 transition-all text-base ml-4"
              style={{ textDecoration: 'none' }}
            >
              <FaGithub size={22} />
              GitHub
            </a>
          </div>
          <input
            type="text"
            placeholder="Start searching..."
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-zinc-300 bg-zinc-50 transition-all duration-300 focus:scale-[1.02]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <TagList tags={DEFAULT_TAGS} selectedTag={selectedTag} onSelect={setSelectedTag} />
        </header>
        <main className="w-full max-w-4xl mx-auto flex-1">
          <SnippetList selectedTag={selectedTag} search={search} />
        </main>
      </div>
    </>
  );
}
