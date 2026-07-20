import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface CompareAnalysisResult {
  overview: string;
  tools: {
    name: string;
    pros: string[];
    cons: string[];
    bestFor: string;
  }[];
  recommendation: string;
}

export function useCompareAnalysis() {
  return useMutation({
    mutationFn: async (toolIds: string[]) => {
      const { data } = await api.post<CompareAnalysisResult>(
        "/recommend/compare",
        { toolIds }
      );
      return data;
    },
  });
}