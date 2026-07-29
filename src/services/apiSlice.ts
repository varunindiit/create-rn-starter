import {createApi} from '@reduxjs/toolkit/query/react';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import api from './api';
import {ApiError, normaliseError} from './apiError';

/**
 * RTK Query, backed by the same axios instance as the imperative helpers.
 *
 * Sharing the instance means auth headers, timeouts, logging and the 401
 * session-clear all behave identically whether a screen uses a generated hook
 * or calls `get()` directly — there is one network path, not two.
 *
 * RTK Query itself ships inside `@reduxjs/toolkit`, so this costs no extra
 * dependency: you get caching, deduplication, polling, invalidation and
 * loading/error state for free.
 */

export interface AxiosBaseQueryArgs {
  url: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
}

const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async ({url, method = 'get', data, params, headers}) => {
    try {
      const result = await api.request({url, method, data, params, headers});
      return {data: result.data};
    } catch (error) {
      return {error: normaliseError(error)};
    }
  };

/**
 * Cache tags. Adding one here and listing it in `providesTags`/`invalidatesTags`
 * is what makes a mutation refresh the right queries automatically.
 */
export const API_TAGS = ['Profile', 'Session'] as const;

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: axiosBaseQuery(),
  tagTypes: API_TAGS,
  // Sensible mobile defaults: keep data for a minute, refetch when the app
  // comes back to the foreground or regains connectivity.
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

export default apiSlice;
