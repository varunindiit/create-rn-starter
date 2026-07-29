import axios from 'axios';

/**
 * One shape for every failure the app can show a user.
 *
 * Screens should never branch on `axios.isAxiosError`, `error.response.status`
 * and `error.code` themselves — they call `normaliseError` once and switch on
 * `kind`, which is a closed set.
 */
export type ApiErrorKind =
  | 'network' // no response at all — offline, DNS, connection refused
  | 'timeout'
  | 'cancelled'
  | 'unauthorized' // 401 — token missing/expired
  | 'forbidden' // 403
  | 'notFound' // 404
  | 'validation' // 400/422 — the request was understood but rejected
  | 'conflict' // 409
  | 'rateLimited' // 429
  | 'server' // 5xx
  | 'unknown';

export interface ApiError {
  kind: ApiErrorKind;
  /** Safe to render. Never contains a stack trace or raw payload. */
  message: string;
  status?: number;
  /** Field-level messages from a validation response, when the API sends them. */
  fieldErrors?: Record<string, string>;
  /** Whether retrying the same request could plausibly succeed. */
  retryable: boolean;
  /** The original throwable, for logging — never for display. */
  cause?: unknown;
}

const DEFAULT_MESSAGES: Record<ApiErrorKind, string> = {
  network: 'No internet connection. Check your network and try again.',
  timeout: 'The request took too long. Please try again.',
  cancelled: 'Request cancelled.',
  unauthorized: 'Your session has expired. Please sign in again.',
  forbidden: "You don't have permission to do that.",
  notFound: 'We could not find what you were looking for.',
  validation: 'Please check the details you entered.',
  conflict: 'That conflicts with something that already exists.',
  rateLimited: 'Too many requests. Please wait a moment and try again.',
  server: 'Something went wrong on our end. Please try again shortly.',
  unknown: 'Something went wrong. Please try again.',
};

const RETRYABLE: ApiErrorKind[] = ['network', 'timeout', 'server', 'rateLimited'];

const kindForStatus = (status: number): ApiErrorKind => {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'notFound';
  if (status === 409) return 'conflict';
  if (status === 422 || status === 400) return 'validation';
  if (status === 429) return 'rateLimited';
  if (status >= 500) return 'server';
  return 'unknown';
};

/** Pull a human message out of the many shapes APIs use. */
const messageFromBody = (data: unknown): string | undefined => {
  if (typeof data === 'string' && data.trim()) return data.trim();
  if (!data || typeof data !== 'object') return undefined;
  const body = data as Record<string, unknown>;
  for (const key of ['message', 'error', 'detail', 'title'] as const) {
    const value = body[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
};

/** Pull `{ errors: { email: "…" } }` style field errors out of a body. */
const fieldErrorsFromBody = (
  data: unknown,
): Record<string, string> | undefined => {
  if (!data || typeof data !== 'object') return undefined;
  const raw = (data as Record<string, unknown>).errors;
  if (!raw || typeof raw !== 'object') return undefined;

  const out: Record<string, string> = {};
  for (const [field, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof value === 'string') out[field] = value;
    else if (Array.isArray(value) && typeof value[0] === 'string') {
      out[field] = value[0];
    }
  }
  return Object.keys(out).length ? out : undefined;
};

/**
 * Convert anything thrown by the network layer into an {@link ApiError}.
 * Total — it never throws and always returns a renderable message.
 */
export function normaliseError(error: unknown): ApiError {
  if (isApiError(error)) return error;

  if (axios.isCancel(error)) {
    return {
      kind: 'cancelled',
      message: DEFAULT_MESSAGES.cancelled,
      retryable: false,
      cause: error,
    };
  }

  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return {
        kind: 'timeout',
        message: DEFAULT_MESSAGES.timeout,
        retryable: true,
        cause: error,
      };
    }

    if (!error.response) {
      return {
        kind: 'network',
        message: DEFAULT_MESSAGES.network,
        retryable: true,
        cause: error,
      };
    }

    const status = error.response.status;
    const kind = kindForStatus(status);
    return {
      kind,
      status,
      message: messageFromBody(error.response.data) ?? DEFAULT_MESSAGES[kind],
      fieldErrors: fieldErrorsFromBody(error.response.data),
      retryable: RETRYABLE.includes(kind),
      cause: error,
    };
  }

  return {
    kind: 'unknown',
    message:
      error instanceof Error && error.message
        ? error.message
        : DEFAULT_MESSAGES.unknown,
    retryable: false,
    cause: error,
  };
}

export const isApiError = (value: unknown): value is ApiError =>
  !!value &&
  typeof value === 'object' &&
  'kind' in value &&
  'message' in value &&
  'retryable' in value;

/** Convenience for the common "show the user something" path. */
export const errorMessage = (error: unknown): string =>
  normaliseError(error).message;
