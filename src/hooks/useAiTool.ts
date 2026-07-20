import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AITool } from "../types/aiTool";

export function useAiTool(id: string | undefined) {
  return useQuery({
    queryKey: ["ai-tool", id],
    queryFn: async () => {
      const { data } = await api.get<AITool>(`/ai-tools/${id}`);
      return data;
    },
    enabled: !!id,
  });
}