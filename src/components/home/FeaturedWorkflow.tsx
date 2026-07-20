import { useNavigate } from "react-router-dom";
import { useWorkflows } from "../../hooks/useWorkflows";
import { useAiTools } from "../../hooks/useAiTools";
import type { Workflow, WorkflowStep } from "../../types/workflow";
import type { AITool } from "../../types/aiTool";

export default function FeaturedWorkflow() {
  const navigate = useNavigate();
  const { data: workflows, isLoading, error } = useWorkflows();
  const { data: aiTools } = useAiTools();

  if (isLoading) {
    return (
      <section className="text-center">
        <p className="text-slate-500">불러오는 중...</p>
      </section>
    );
  }

  if (error || !workflows) {
    return (
      <section className="text-center">
        <p className="text-red-500">데이터를 불러오지 못했어요.</p>
      </section>
    );
  }

  const findToolByName = (name: string) =>
    aiTools?.find((t: AITool) => t.name === name);

  return (
    <section className="text-center">
      <h2 className="mb-12 text-5xl font-black text-slate-900">
        🧩 인기 워크플로우
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {workflows.map((workflow: Workflow) => (
          <div
            key={workflow.id}
            onClick={() => navigate(`/workflow/${workflow.id}`)}
            className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
          >
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {workflow.category}
            </span>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              {workflow.title}
            </h3>

            <p className="mt-4 min-h-[80px] leading-7 text-slate-500">
              {workflow.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {workflow.steps
                .slice()
                .sort((a: WorkflowStep, b: WorkflowStep) => a.order - b.order)
                .map((step: WorkflowStep, idx: number) => {
                  const tool = findToolByName(step.toolName);

                  return (
                    <div key={step.id} className="flex items-center gap-2">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (tool) navigate(`/tool/${tool.id}`);
                        }}
                        className={`rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition ${
                          tool
                            ? "cursor-pointer hover:bg-blue-100 hover:text-blue-700"
                            : ""
                        }`}
                      >
                        {step.toolName}
                      </span>

                      {idx < workflow.steps.length - 1 && (
                        <span className="text-slate-300">→</span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}