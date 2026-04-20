import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const createApi = () => {
  const { serverUrl, token } = useAuthStore.getState();

  return axios.create({
    baseURL: `${serverUrl}/api`,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Cache-Control": "no-cache", // 👈 forces fresh response every time
    },
    timeout: 10000,
  });
};
