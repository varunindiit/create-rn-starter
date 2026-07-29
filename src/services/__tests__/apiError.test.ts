import {AxiosError, AxiosHeaders} from 'axios';
import {normaliseError, errorMessage} from '../apiError';

const axiosErrorWith = (status: number, data?: unknown) => {
  const error = new AxiosError('Request failed');
  error.response = {
    status,
    data,
    statusText: '',
    headers: new AxiosHeaders(),
    config: {headers: new AxiosHeaders()},
  } as never;
  return error;
};

describe('normaliseError', () => {
  it('maps status codes to a closed set of kinds', () => {
    expect(normaliseError(axiosErrorWith(401)).kind).toBe('unauthorized');
    expect(normaliseError(axiosErrorWith(403)).kind).toBe('forbidden');
    expect(normaliseError(axiosErrorWith(404)).kind).toBe('notFound');
    expect(normaliseError(axiosErrorWith(409)).kind).toBe('conflict');
    expect(normaliseError(axiosErrorWith(422)).kind).toBe('validation');
    expect(normaliseError(axiosErrorWith(429)).kind).toBe('rateLimited');
    expect(normaliseError(axiosErrorWith(503)).kind).toBe('server');
  });

  it('treats a response-less axios error as a network failure, and retryable', () => {
    const error = new AxiosError('Network Error');
    const result = normaliseError(error);
    expect(result.kind).toBe('network');
    expect(result.retryable).toBe(true);
  });

  it('marks a timeout retryable and distinct from a plain network error', () => {
    const error = new AxiosError('timeout');
    error.code = 'ECONNABORTED';
    expect(normaliseError(error).kind).toBe('timeout');
    expect(normaliseError(error).retryable).toBe(true);
  });

  it('prefers a server-supplied message over the generic default', () => {
    const result = normaliseError(
      axiosErrorWith(400, {message: 'Email already taken'}),
    );
    expect(result.message).toBe('Email already taken');
  });

  it('extracts field errors from both string and array shapes', () => {
    const result = normaliseError(
      axiosErrorWith(422, {
        errors: {email: 'Already used', password: ['Too short']},
      }),
    );
    expect(result.fieldErrors).toEqual({
      email: 'Already used',
      password: 'Too short',
    });
  });

  it('never throws, and always yields a renderable message', () => {
    for (const input of [undefined, null, 'boom', 42, {}, new Error('x')]) {
      expect(typeof errorMessage(input)).toBe('string');
      expect(errorMessage(input).length).toBeGreaterThan(0);
    }
  });

  it('is idempotent — normalising twice changes nothing', () => {
    const once = normaliseError(axiosErrorWith(500));
    expect(normaliseError(once)).toBe(once);
  });
});
