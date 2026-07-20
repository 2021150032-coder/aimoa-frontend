import { useParams, useNavigate } from "react-router-dom";
import { ExternalLink, Search, Star } from "lucide-react";
import { useAiTool } from "../../hooks/useAiTool";

const Tool = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tool, isLoading, error } = useAiTool(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-20 text-center text-slate-500">
        불러오는 중...
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-20 text-center">
        <p className="text-red-500">해당 AI 툴을 찾을 수 없어요.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const isSearchLink = tool.homepage.includes("google.com/search");

  return (
    <div className="mx-auto max-w-4xl px-8 py-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-slate-500 hover:text-blue-600"
      >
        ← 돌아가기
      </button>

      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="h-12 w-12 rounded-xl object-cover"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth <= 16) {
                      img.style.display = "none";
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <span
                className="hidden h-12 w-12 items-center justify-center rounded-xl bg-slate-200 text-2xl font-bold text-slate-400"
                style={{ display: tool.logo ? "none" : "flex" }}
              >
                {tool.name.charAt(0)}
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-900">
                {tool.name}
              </h1>
              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-4 py-2 text-lg font-semibold text-amber-600">
              <Star size={18} fill="currentColor" />
              {tool.rating.toFixed(1)}
            </div>
            <span className="text-xs text-slate-400">AI 예상 평점</span>
          </div>
        </div>

        <p className="mt-8 text-lg leading-8 text-slate-600">
          {tool.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tool.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-8">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-emerald-50 px-4 py-2 font-semibold text-emerald-600">
              {tool.price}
            </span>
            <span className="text-slate-500">{tool.difficulty}</span>
          </div>
          <a

          
            href={tool.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {isSearchLink ? (
              <>
                검색해보기
                <Search size={16} />
              </>
            ) : (
              <>
                방문하기
                <ExternalLink size={16} />
              </>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tool;