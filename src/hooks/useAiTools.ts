import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { AITool } from "../types/aiTool";

export function useAiTools() {
  return useQuery({
    queryKey: ["ai-tools"],
    queryFn: async () => {
      const { data } = await api.get<AITool[]>("/ai-tools");
      return data;
    },
  });
}