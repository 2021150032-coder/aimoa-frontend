// src/types/workflow.ts
export interface WorkflowStep {
  id: string;
  order: number;
  toolName: string;
  toolLogo?: string;
  description?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
}