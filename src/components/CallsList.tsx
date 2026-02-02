import { useCalls } from "../hooks/useCalls";
import { CallItem } from "./Calltem";

export function CallsList() {
  const { callsQuery } = useCalls();

  if (callsQuery.isLoading) return <div>Loading...</div>;
  
  if (callsQuery.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Error: {callsQuery.error?.message || "Failed to load calls"}</div>
      </div>
    );
  }

  if (!callsQuery.data || callsQuery.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>No calls available</div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto">
      {callsQuery.data.map((call) => (
        <CallItem key={call.id} call={call} />
      ))}
    </div>
  );
}
