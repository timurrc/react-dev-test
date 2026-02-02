import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCalls, updateCallStatus } from "../api/calls";
import type { Call } from "../types";

export function useCalls() {
  const queryClient = useQueryClient();

  const callsQuery = useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,
    retry: 2,
  });

  const updateStatus = useMutation({
    mutationFn: updateCallStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["calls"] });
      const prev = queryClient.getQueryData<Call[]>(["calls"]);
      
      queryClient.setQueryData<Call[]>(["calls"], (calls = []) =>
        calls.map((c) => (c.id === id ? { ...c, status } : c))
      );

      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["calls"], ctx.prev);
      }
    },
  });

  return { callsQuery, updateStatus };
}