import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Check, GitCompareArrows, Search as SearchIcon, Sparkles } from "lucide-react";
import { useAiTools } from "../../hooks/useAiTools";
import { useWorkflows } from "../../hooks/useWorkflows";
import { useRecommend } from "../../hooks/useRecommend";
import AIToolCard from "../../components/home/AIToolCard";
import type { AITool } from "../../types/aiTool";
import type { Workflow } from "../../types/workflow";

type RecommendationData = NonNullable<ReturnType<typeof useRecommend>["data"]>;

const LAST_QUERY_KEY = "aiCompass:lastQuery";
const LAST_RECOMMENDATION_KEY = "aiCompass:lastRecommendation";

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery =
    searchParams.get("q") ?? sessionStorage.getItem(LAST_QUERY_KEY) ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  const { data: aiTools, isLoading: toolsLoading } = useAiTools();
  const { data: workflows, isLoading: workflowsLoading } = useWorkflows();
  const recommend = useRecommend();
  const [savedRecommendation, setSavedRecommendation] =
    useState<RecommendationData | null>(() => {
      try {
        const saved = sessionStorage.getItem(LAST_RECOMMENDATION_KEY);
        return saved ? (JSON.parse(saved) as RecommendationData) : null;
      } catch {
        sessionStorage.removeItem(LAST_RECOMMENDATION_KEY);
        return null;
      }
    });

  const recommendationData = recommend.data ?? savedRecommendation;

  const runRecommendation = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    recommend.mutate(trimmedQuery, {
      onSuccess: (data) => {
        setSavedRecommendation(data);
        sessionStorage.setItem(LAST_QUERY_KEY, trimmedQuery);
        sessionStorage.setItem(LAST_RECOMMENDATION_KEY, JSON.stringify(data));
      },
    });
  };

  useEffect(() => {
    if (!initialQuery.trim()) return;

    const savedQuery = sessionStorage.getItem(LAST_QUERY_KEY);
    const hasMatchingSavedResult =
      savedQuery === initialQuery && Boolean(savedRecommendation);

    if (!hasMatchingSavedResult) {
      runRecommendation(initialQuery);
    }
    // URL 검색어가 바뀔 때만 새 추천을 요청합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const filteredTools = useMemo(() => {
    if (!aiTools) return [];
    if (!query.trim()) return aiTools;

    const q = query.toLowerCase();
    return aiTools.filter(
      (tool: AITool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some((tag: string) => tag.toLowerCase().includes(q))
    );
  }, [aiTools, query]);

  const filteredWorkflows = useMemo(() => {
    if (!workflows) return [];
    if (!query.trim()) return workflows;

    const q = query.toLowerCase();
    return workflows.filter(
      (wf: Workflow) =>
        wf.title.toLowerCase().includes(q) ||
        wf.description.toLowerCase().includes(q) ||
        wf.category.toLowerCase().includes(q)
    );
  }, [workflows, query]);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const currentUrlQuery = searchParams.get("q") ?? "";
    if (currentUrlQuery !== trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      return;
    }

    runRecommendation(trimmedQuery);
  };


  const toggleCompare = (id: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      }

      if (prev.length >= 3) {
        alert("비교는 최대 3개까지 선택할 수 있어요.");
        return prev;
      }

      return [...prev, id];
    });
  };

  const goToCompare = () => {
    if (selectedCompareIds.length < 2) {
      alert("비교할 AI 툴을 2개 이상 선택해주세요.");
      return;
    }

    navigate(`/compare?ids=${selectedCompareIds.join(",")}`);
  };

  const findTool = (id: string) => aiTools?.find((t: AITool) => t.id === id);
  const findWorkflow = (id: string) =>
    workflows?.find((w: Workflow) => w.id === id);

  return (
    <div className="mx-auto max-w-6xl px-8 py-16">
      <h1 className="text-4xl font-black text-slate-900">검색</h1>

      <div className="mt-8 flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        <SearchIcon className="ml-3 text-slate-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="AI 툴이나 워크플로우를 검색해보세요"
          className="flex-1 bg-transparent px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Sparkles size={16} />
          AI 추천
        </button>
      </div>

      {/* GPT 추천 결과 */}
      {recommend.isPending && (
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-blue-600">
          AI가 추천을 생각하는 중이에요...
        </div>
      )}

      {recommend.isError && (
        <div className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600">
          추천을 불러오지 못했어요. 다시 시도해주세요.
        </div>
      )}

      {recommendationData && (
        <div className="mt-10 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
          <div className="flex items-center gap-2 text-blue-700">
            <Sparkles size={20} />
            <h2 className="text-xl font-bold">AI 추천</h2>
          </div>

          <p className="mt-3 text-slate-700">{recommendationData.summary}</p>

          {recommendationData.recommendedTools.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendationData.recommendedTools.map((rt) => {
                const tool = findTool(rt.id);
                return (
                  <div
                    key={rt.id}
                    className={`rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                      selectedCompareIds.includes(rt.id)
                        ? "border-blue-500 ring-2 ring-blue-100"
                        : "border-blue-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => navigate(`/tool/${rt.id}`)}
                      className="w-full text-left"
                    >
                      <h3 className="font-bold text-slate-900">
                        {tool?.name ?? rt.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {rt.reason}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleCompare(rt.id)}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        selectedCompareIds.includes(rt.id)
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {selectedCompareIds.includes(rt.id) ? (
                        <>
                          <Check size={16} />
                          비교 선택됨
                        </>
                      ) : (
                        <>
                          <GitCompareArrows size={16} />
                          비교에 추가
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {recommendationData.recommendedTools.length >= 2 && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={goToCompare}
                disabled={selectedCompareIds.length < 2}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <GitCompareArrows size={18} />
                선택한 AI 비교 ({selectedCompareIds.length})
              </button>
              <p className="text-xs text-slate-500">
                추천 결과에서 2~3개의 AI 툴을 선택해주세요.
              </p>
            </div>
          )}

          {recommendationData.recommendedWorkflow && (
            <div
              onClick={() =>
                navigate(`/workflow/${recommendationData.recommendedWorkflow!.id}`)
              }
              className="mt-4 cursor-pointer rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold text-blue-600">
                추천 워크플로우
              </span>
              <h3 className="mt-1 font-bold text-slate-900">
                {findWorkflow(recommendationData.recommendedWorkflow.id)?.title ??
                  recommendationData.recommendedWorkflow.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {recommendationData.recommendedWorkflow.reason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 워크플로우 결과 */}
      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          워크플로우 ({workflowsLoading ? "..." : filteredWorkflows.length})
        </h2>

        {workflowsLoading ? (
          <p className="text-slate-500">불러오는 중...</p>
        ) : filteredWorkflows.length === 0 ? (
          <p className="text-slate-400">검색 결과가 없어요.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {filteredWorkflows.map((wf: Workflow) => (
              <div
                key={wf.id}
                onClick={() => navigate(`/workflow/${wf.id}`)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {wf.category}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {wf.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {wf.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI 툴 결과 */}
      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          AI 툴 ({toolsLoading ? "..." : filteredTools.length})
        </h2>

        {toolsLoading ? (
          <p className="text-slate-500">불러오는 중...</p>
        ) : filteredTools.length === 0 ? (
          <p className="text-slate-400">검색 결과가 없어요.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {filteredTools.map((tool: AITool) => (
              <AIToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;