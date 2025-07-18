import React, { useEffect, useState } from "react";

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  author: string;
  added_at: string;
}

interface SnippetListProps {
  selectedTag?: string | null;
  search?: string;
  onTagsExtracted?: (tags: string[]) => void;
}

const fetchSnippets = async (): Promise<Snippet[]> => {
  const res = await fetch("/data.json");
  return res.json();
};

const TAG_COLORS: Record<string, string> = {
  "Web Development": "bg-purple-100 text-purple-800",
  "Web Design": "bg-pink-200 text-pink-800",
  "Javascript": "bg-blue-200 text-blue-800",
  "React-Redux": "bg-orange-200 text-orange-800",
  "Typescript": "bg-yellow-200 text-yellow-800",
  "Database": "bg-cyan-200 text-cyan-800",
  "Package": "bg-red-200 text-red-800",
  "Git": "bg-zinc-200 text-zinc-800",
  "Network": "bg-green-200 text-green-800"
};

const SnippetList: React.FC<SnippetListProps> = ({ selectedTag, search = "", onTagsExtracted }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSnippets().then((data) => {
      setSnippets(data);
      setLoading(false);
      if (onTagsExtracted) {
        const allTags = Array.from(new Set(data.flatMap((s: Snippet) => s.tags)));
        onTagsExtracted(allTags);
      }
    });
  }, [onTagsExtracted]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  if (loading) return <div>Loading...</div>;

  // Tag and search filter
  const filtered = snippets.filter(s => {
    const matchesTag = selectedTag ? s.tags.includes(selectedTag) : true;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-8">
      {filtered.length === 0 && <div className="text-center text-zinc-500">No snippets found.</div>}
      {filtered.map((snippet, i) => (
        <div
          key={snippet.id}
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden hover:shadow-xl transition w-full animate-fadein"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex flex-col justify-between p-6 w-full md:max-w-[320px] min-w-[220px] gap-2">
            <div>
              <h2 className="font-bold text-xl mb-1 text-zinc-900">{snippet.title}</h2>
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2">{snippet.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded font-semibold text-xs shadow-sm ${TAG_COLORS[tag] || "bg-zinc-100 text-zinc-800"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            {snippet.author.includes('github.com/') ? (
              <a
                href={`https://${snippet.author}`.replace('https://https://', 'https://')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-500 font-semibold underline underline-offset-2 hover:text-pink-500 transition-colors"
              >
                Added by: {snippet.author.replace('github.com/', '')}
              </a>
            ) : (
              <span className="text-xs text-zinc-400">Added by: {snippet.author}</span>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between bg-zinc-50 p-4 border-t md:border-t-0 md:border-l border-zinc-100 min-w-0">
            <pre className="text-xs leading-relaxed mb-2 text-zinc-800 bg-zinc-100 rounded-lg p-3 font-mono break-all whitespace-pre-line max-h-32 overflow-auto">
              <code>{snippet.code}</code>
            </pre>
            <div className="flex justify-end">
              <button
                className="bg-zinc-900 text-white px-4 py-1.5 rounded-lg hover:bg-zinc-700 text-xs font-semibold transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-zinc-400"
                onClick={() => handleCopy(snippet.code)}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetList; 