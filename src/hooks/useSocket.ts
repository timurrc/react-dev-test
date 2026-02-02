import { useEffect } from "react";
import { subscribe, connectSocket } from "../api/socket";
import { useQueryClient } from "@tanstack/react-query";
import type { Call } from "../types";

export function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    connectSocket();
    const unsubscribe = subscribe((update) => {
      queryClient.setQueryData<Call[]>(["calls"], (calls = []) => {
        if (!calls || calls.length === 0) return calls;

        const index = calls.findIndex((c) => c.id === update.id);
        if (index === -1) return calls;

        return calls.map((c) => 
          c.id === update.id ? { ...c, ...update } : c
        );
      });
    });
    return unsubscribe;
  }, [queryClient]);
}
