import { useUIStore } from "../store/uiStore";
import { useCalls } from "../hooks/useCalls";

export function CallDetails() {
  const call = useUIStore((s) => s.selectedCall);
  const { updateStatus } = useCalls();

  if (!call) {
    return (
      <div className="flex items-center justify-center">Select a call</div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div>
        <h2>{call.phone}</h2>
        <p>Status: {call.status}</p>

        {updateStatus.isError && (
          <div className="text-red-500 mb-2">
            Error: {updateStatus.error?.message || "Failed to update status"}
          </div>
        )}

        <button
          onClick={() => updateStatus.mutate({ id: call.id, status: "hold" })}
          disabled={updateStatus.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {updateStatus.isPending ? "Updating..." : "Hold"}
        </button>
      </div>
    </div>
  );
}
