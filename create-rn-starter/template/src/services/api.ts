import axios, { AxiosInstance } from "axios";
import Config from "./Config";
import { storage } from "./storage";
import { TOKEN_KEY } from "../utils/constants";

const api: AxiosInstance = axios.create({
  baseURL: Config.coreAPI,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = storage.getString(TOKEN_KEY);
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      storage.remove(TOKEN_KEY);
    }
    return Promise.reject(error);
  },
);

/**
 * Mocked endpoint helper. While we don't yet have a backend, callers can use
 * `mocked(data, delay)` instead of `api.get/post/...` and get a Promise that
 * resolves with `{ data }` after a tiny delay. Replace with real api.* calls.
 */
export const mocked = <T>(data: T, ms = 350): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

export default api;
