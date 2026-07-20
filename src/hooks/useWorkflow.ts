import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Workflow } from "../types/workflow";

export function useWorkflow(id: string | undefined) {
  return useQuery({
    queryKey: ["workflow", id],
    queryFn: async () => {
      const { data } = await api.get<Workflow>(`/workflows/${id}`);
      return data;
    },
    enabled: !!id,
  });
}