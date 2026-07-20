import { useAiTools } from "../../hooks/useAiTools";
import AIToolCard from "./AIToolCard";
import type { AITool } from "../../types/aiTool";

export default function PopularAI() {
  const { data: aiTools, isLoading, error } = useAiTools();

  if (isLoading) {
    return (
      <section className="text-center">
        <p className="text-slate-500">불러오는 중...</p>
      </section>
    );
  }

  if (error || !aiTools) {
    return (
      <section className="text-center">
        <p className="text-red-500">데이터를 불러오지 못했어요.</p>
      </section>
    );
  }

  return (
    <section className="text-center">
      <h2 className="mb-12 text-5xl font-black text-slate-900">
        🔥 인기 AI
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {aiTools.map((tool: AITool) => (
          <AIToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}