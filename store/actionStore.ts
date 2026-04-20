import { create } from "zustand";
import { createApi } from "../services/api";

export interface Action {
  id: string;
  name: string;
  type: string;
  icon?: string;
  color?: string;
  enabled: boolean;
}

interface ActionsState {
  actions: Action[];
  isLoading: boolean;
  error: string | null;
  fetchActions: () => Promise<void>;
}

export const useActionsStore = create<ActionsState>((set) => ({
  actions: [],
  isLoading: false,
  error: null,

  fetchActions: async () => {
    set({ isLoading: true, error: null });
    try {
      const api = createApi();
      const response = await api.get("/actions");
      set({ actions: response.data.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Failed to fetch actions",
        isLoading: false,
      });
    }
  },
}));
