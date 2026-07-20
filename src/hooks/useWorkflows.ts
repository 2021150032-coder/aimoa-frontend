import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Workflow } from "../types/workflow";

export function useWorkflows() {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const { data } = await api.get<Workflow[]>("/workflows");
      return data;
    },
  });
}