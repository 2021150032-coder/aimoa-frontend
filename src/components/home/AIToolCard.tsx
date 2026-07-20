import { useNavigate } from "react-router-dom";
import type { AITool } from "../../types/aiTool";
import { ArrowUpRight, Star } from "lucide-react";

interface AIToolCardProps {
  tool: AITool;
}

export default function AIToolCard({ tool }: AIToolCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/tool/${tool.id}`)}
      className="
    group
    cursor-pointer
    flex
    h-full
    flex-col
    rounded-3xl
    border border-slate-200
    bg-white
    p-6
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-2
    hover:border-blue-300
    hover:shadow-2xl
  "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition group-hover:bg-blue-50">
            {tool.logo ? (
              <img
                src={tool.logo}
                alt={tool.name}
                className="h-10 w-10 rounded-xl object-cover"
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
              className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-lg font-bold text-slate-400"
              style={{ display: tool.logo ? "none" : "flex" }}
            >
              {tool.name.charAt(0)}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {tool.name}
            </h3>

            <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              {tool.category}
            </span>
          </div>
        </div>

        <div
          className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600"
          title="AI 예상 평점입니다"
        >
          <Star size={14} fill="currentColor" />
          {tool.rating.toFixed(1)}
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 line-clamp-3 flex-1 leading-7 text-slate-600">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
          {tool.price}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            {tool.difficulty}
          </span>

          <ArrowUpRight
            size={18}
            className="
        text-slate-400
        transition
        duration-300
        group-hover:translate-x-1
        group-hover:-translate-y-1
        group-hover:text-blue-600"
          />
        </div>
      </div>
    </div>
  );
}