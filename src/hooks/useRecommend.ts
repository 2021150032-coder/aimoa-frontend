import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface RecommendResult {
  summary: string;
  recommendedTools: {
    id: string;
    name: string;
    reason: string;
  }[];
  recommendedWorkflow: {
    id: string;
    title: string;
    reason: string;
  } | null;
}

export function useRecommend() {
  return useMutation({
    mutationFn: async (query: string) => {
      const { data } = await api.post<RecommendResult>("/recommend", {
        query,
      });
      return data;
    },
  });
}