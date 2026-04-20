import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "deck_agent_token";
const URL_KEY = "deck_agent_url";

interface AuthState {
  token: string | null;
  serverUrl: string | null;
  isLoading: boolean;

  setAuth: (token: string, serverUrl: string) => Promise<void>;
  loadAuth: () => Promise<void>;
  clearAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  serverUrl: null,
  isLoading: true,

  setAuth: async (token, serverUrl) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(URL_KEY, serverUrl);
    set({
      token,
      serverUrl,
    });
  },
  loadAuth: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const serverUrl = await SecureStore.getItemAsync(URL_KEY);

    set({ token, serverUrl, isLoading: false });
  },
  clearAuth: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(URL_KEY);

    set({
      token: null,
      serverUrl: null,
    });
  },
}));
