import { create } from "zustand";
import { createApi } from "../services/api";

interface ExecutionState {
  triggering: string | null; // actionId currently being triggered
  triggerAction: (actionId: string) => Promise<void>;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  triggering: null,

  triggerAction: async (actionId) => {
    set({ triggering: actionId });
    try {
      const api = createApi();
      await api.post("/executions", { actionId });
    } catch (error) {
      // we'll handle errors better later
      console.error("Trigger failed:", error);
    } finally {
      set({ triggering: null });
    }
  },
}));