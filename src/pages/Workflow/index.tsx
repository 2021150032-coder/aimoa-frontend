import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useWorkflow } from "../../hooks/useWorkflow";
import { useAiTools } from "../../hooks/useAiTools";
import type { AITool } from "../../types/aiTool";

const Workflow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: workflow, isLoading, error } = useWorkflow(id);
  const { data: aiTools } = useAiTools();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-20 text-center text-slate-500">
        불러오는 중...
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="mx-auto max-w-4xl px-8 py-20 text-center">
        <p className="text-red-500">해당 워크플로우를 찾을 수 없어요.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const sortedSteps = [...workflow.steps].sort((a, b) => a.order - b.order);

  const findToolByName = (name: string) =>
    aiTools?.find((t: AITool) => t.name === name);

  return (
    <div className="mx-auto max-w-4xl px-8 py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        돌아가기
      </Link>

      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
        {workflow.category}
      </span>

      <h1 className="mt-5 text-4xl font-black text-slate-900">
        {workflow.title}
      </h1>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        {workflow.description}
      </p>

      <div className="mt-12 space-y-4">
        {sortedSteps.map((step, idx) => {
          const tool = findToolByName(step.toolName);

          return (
            <div
              key={step.id}
              onClick={() => tool && navigate(`/tool/${tool.id}`)}
              className={`flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition ${
                tool
                  ? "cursor-pointer hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {idx + 1}
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {step.toolName}
              </div>
              {tool && (
                <span className="ml-auto text-sm text-blue-500">
                  자세히 보기 →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workflow;