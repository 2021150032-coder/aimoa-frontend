import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex items-center rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/40 transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-blue-100">
        {/* Search Icon */}
        <Search className="ml-4 text-slate-400" size={22} />

        {/* Input */}
        <input
          type="text"
          placeholder="무엇을 만들고 싶나요? (예: 발표용 PPT 만들어줘)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 bg-transparent px-4 py-5 text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />

        {/* Button */}
        <button
          onClick={handleSearch}
          className="mr-1 flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
        >
          <Sparkles size={18} />
          AI 추천
        </button>
      </div>

      {/* Hint */}
      <p className="mt-4 text-center text-sm text-slate-500">
        예시 :{" "}
        <span className="font-medium text-slate-700">
          유튜브 쇼츠 제작
        </span>
        {" · "}
        <span className="font-medium text-slate-700">
          AI 발표자료 만들기
        </span>
        {" · "}
        <span className="font-medium text-slate-700">
          논문 요약
        </span>
      </p>
    </div>
  );
}