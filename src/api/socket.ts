import type { Call } from "../types";

type Listener = (update: Partial<Call>) => void;

let listeners: Listener[] = [];
let intervalId: ReturnType<typeof setInterval> | null = null;

export function connectSocket() {
  intervalId = setInterval(() => {
    const callId = String(Math.floor(Math.random() * 1000));
    const update: Partial<Call> = {
      id: callId,
      status: Math.random() > 0.5 ? "active" : "hold",
      updatedAt: Date.now(),
    };
    listeners.forEach((l) => l(update));
  }, 1000);
}

export function disconnectSocket() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  listeners = [];
}

export function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {};
}
