import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import Config from './Config';
import {clearSession, storage} from './storage';
import {ApiError, normaliseError} from './apiError';
import {TOKEN_KEY} from '../utils/constants';

const api: AxiosInstance = axios.create({
  baseURL: Config.coreAPI,
  timeout: Config.requestTimeoutMs,
  headers: {Accept: 'application/json'},
});

/**
 * What to do when the API says the session is gone.
 *
 * Registered by the store at startup rather than imported, because the store
 * imports the API layer — wiring it the other way round would be a require
 * cycle that Metro resolves to `undefined` at runtime.
 */
type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null) => {
  onUnauthorized = handler;
};

// ── request ──────────────────────────────────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getString(TOKEN_KEY);
  if (token) config.headers.set('Authorization', `Bearer ${token}`);

  if (Config.enableApiLogging) {
    const method = (config.method ?? 'get').toUpperCase();
    console.log(`→ ${method} ${config.baseURL ?? ''}${config.url ?? ''}`);
  }
  return config;
});

// ── response ─────────────────────────────────────────────────────────────────
api.interceptors.response.use(
  response => {
    if (Config.enableApiLogging) {
      const method = (response.config.method ?? 'get').toUpperCase();
      console.log(`← ${response.status} ${method} ${response.config.url ?? ''}`);
    }
    return response;
  },
  error => {
    const apiError = normaliseError(error);

    if (Config.enableApiLogging) {
      console.warn(
        `← ${apiError.status ?? '—'} ${apiError.kind}: ${apiError.message}`,
      );
    }

    // A dead session is cleared exactly once, here, so no screen has to.
    if (apiError.kind === 'unauthorized') {
      clearSession();
      onUnauthorized?.();
    }

    // Reject with the normalised error so callers never re-parse an AxiosError.
    return Promise.reject(apiError);
  },
);

/**
 * Typed request helper. Returns the response body directly and always rejects
 * with an {@link ApiError}.
 */
export async function request<T>(
  config: Parameters<AxiosInstance['request']>[0],
): Promise<T> {
  try {
    const response = await api.request<T>(config);
    return response.data;
  } catch (error) {
    throw normaliseError(error);
  }
}

export const get = <T>(url: string, params?: unknown) =>
  request<T>({method: 'get', url, params});

export const post = <T>(url: string, data?: unknown) =>
  request<T>({method: 'post', url, data});

export const put = <T>(url: string, data?: unknown) =>
  request<T>({method: 'put', url, data});

export const patch = <T>(url: string, data?: unknown) =>
  request<T>({method: 'patch', url, data});

export const del = <T>(url: string) => request<T>({method: 'delete', url});

export type {ApiError};
export default api;
