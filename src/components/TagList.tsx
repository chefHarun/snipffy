import React from "react";

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


interface TagListProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTag, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 py-2">
      {tags.map(tag => (
        <button
          key={tag}
          className={`px-3 py-1.5 rounded-full font-semibold text-sm shadow transition border-none outline-none focus:ring-2 focus:ring-zinc-300 cursor-pointer hover:scale-105 hover:shadow-md ${TAG_COLORS[tag] || "bg-zinc-100 text-zinc-800"} ${selectedTag === tag ? "ring-2 ring-zinc-400 scale-105" : ""}`}
          onClick={() => onSelect(selectedTag === tag ? null : tag)}
          type="button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagList;
