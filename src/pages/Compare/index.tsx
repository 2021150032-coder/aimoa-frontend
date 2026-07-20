import { useMemo, useState } from "react";
import { X, Star, Sparkles } from "lucide-react";
import { useAiTools } from "../../hooks/useAiTools";
import { useCompareAnalysis } from "../../hooks/useCompareAnalysis";
import type { AITool } from "../../types/aiTool";

const MAX_COMPARE = 3;

const Compare = () => {
  const { data: aiTools, isLoading } = useAiTools();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const analysis = useCompareAnalysis();

  const selectedTools = useMemo(() => {
    if (!aiTools) return [];
    return selectedIds
      .map((id) => aiTools.find((t: AITool) => t.id === id))
      .filter((t): t is AITool => !!t);
  }, [aiTools, selectedIds]);

  const filteredOptions = useMemo(() => {
    if (!aiTools) return [];
    const q = search.toLowerCase();
    return aiTools.filter(
      (t: AITool) =>
        !selectedIds.includes(t.id) &&
        (t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q))
    );
  }, [aiTools, search, selectedIds]);

  const addTool = (id: string) => {
    if (selectedIds.length >= MAX_COMPARE) return;
    setSelectedIds((prev) => [...prev, id]);
    setSearch("");
  };

  const removeTool = (id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-8 py-20 text-center text-slate-500">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-16">
      <h1 className="text-4xl font-black text-slate-900">AI 툴 비교</h1>
      <p className="mt-3 text-slate-500">
        최대 {MAX_COMPARE}개까지 나란히 비교해볼 수 있어요.
      </p>

      {/* 선택된 툴 chips */}
      {selectedTools.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedTools.map((tool) => (
            <span
              key={tool.id}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              {tool.name}
              <button onClick={() => removeTool(tool.id)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 검색해서 추가 */}
      {selectedIds.length < MAX_COMPARE && (
        <div className="relative mt-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="비교할 AI 툴 이름을 검색해서 추가해보세요"
            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
          />

          {search.trim() && (
            <div className="absolute z-10 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
              {filteredOptions.length === 0 ? (
                <p className="p-4 text-sm text-slate-400">
                  검색 결과가 없어요.
                </p>
              ) : (
                filteredOptions.slice(0, 8).map((tool: AITool) => (
                  <button
                    key={tool.id}
                    onClick={() => addTool(tool.id)}
                    className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-slate-50"
                  >
                    <span className="font-medium text-slate-800">
                      {tool.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {tool.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* 비교표 */}
      {selectedTools.length === 0 ? (
        <div className="mt-16 rounded-3xl border border-dashed border-slate-300 py-24 text-center text-slate-400">
          비교할 AI 툴을 검색해서 추가해보세요.
        </div>
      ) : (
        <>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="w-40" />
                  {selectedTools.map((tool) => (
                    <th
                      key={tool.id}
                      className="rounded-t-2xl border border-slate-200 bg-white px-6 py-5 text-left"
                    >
                      <div className="text-lg font-bold text-slate-900">
                        {tool.name}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-amber-600">
                        <Star size={14} fill="currentColor" />
                        {tool.rating.toFixed(1)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-500">
                    카테고리
                  </td>
                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="border-x border-slate-200 bg-white px-6 py-4"
                    >
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {tool.category}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-500">
                    가격
                  </td>
                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="border-x border-slate-200 bg-white px-6 py-4"
                    >
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        {tool.price}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-500">
                    난이도
                  </td>
                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="border-x border-slate-200 bg-white px-6 py-4 text-slate-700"
                    >
                      {tool.difficulty}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-500">
                    설명
                  </td>
                  {selectedTools.map((tool) => (
                    <td
                      key={tool.id}
                      className="border-x border-slate-200 bg-white px-6 py-4 text-sm leading-6 text-slate-600"
                    >
                      {tool.description}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="rounded-bl-2xl px-4 py-4 text-sm font-semibold text-slate-500">
                    태그
                  </td>
                  {selectedTools.map((tool, idx) => (
                    <td
                      key={tool.id}
                      className={`border-x border-b border-slate-200 bg-white px-6 py-4 ${
                        idx === selectedTools.length - 1
                          ? "rounded-br-2xl"
                          : ""
                      }`}
                    >
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI 분석 */}
          {selectedTools.length >= 2 && (
            <div className="mt-8">
              <button
                onClick={() =>
                  analysis.mutate(selectedTools.map((t) => t.id))
                }
                disabled={analysis.isPending}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                <Sparkles size={18} />
                {analysis.isPending ? "분석 중..." : "AI로 차이점 분석하기"}
              </button>

              {analysis.isError && (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600">
                  분석을 불러오지 못했어요. 다시 시도해주세요.
                </div>
              )}

              {analysis.isSuccess && analysis.data && (
                <div className="mt-6 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Sparkles size={20} />
                    <h2 className="text-xl font-bold">AI 비교 분석</h2>
                  </div>

                  <p className="mt-3 leading-7 text-slate-700">
                    {analysis.data.overview}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {analysis.data.tools.map((t) => (
                      <div
                        key={t.name}
                        className="rounded-2xl border border-blue-100 bg-white p-5"
                      >
                        <h3 className="font-bold text-slate-900">
                          {t.name}
                        </h3>

                        <div className="mt-3">
                          <p className="text-xs font-semibold text-emerald-600">
                            장점
                          </p>
                          <ul className="mt-1 space-y-1 text-sm text-slate-600">
                            {t.pros.map((p, i) => (
                              <li key={i}>+ {p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs font-semibold text-red-500">
                            단점
                          </p>
                          <ul className="mt-1 space-y-1 text-sm text-slate-600">
                            {t.cons.map((c, i) => (
                              <li key={i}>- {c}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-500">
                          {t.bestFor}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-white p-5 text-slate-700">
                    <span className="font-semibold text-blue-700">
                      결론:{" "}
                    </span>
                    {analysis.data.recommendation}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Compare;