import reducer, {login, logout, restoreSession} from '../slice/auth';
import {storage} from '../../services/storage';
import {IS_LOGGED_IN, REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../utils/constants';

describe('auth slice', () => {
  beforeEach(() => storage.clearAll());

  it('persists the token and flag on login', () => {
    const state = reducer(undefined, login({token: 'abc', refreshToken: 'ref'}));
    expect(state.isLoggedIn).toBe(true);
    expect(storage.getString(TOKEN_KEY)).toBe('abc');
    expect(storage.getString(REFRESH_TOKEN_KEY)).toBe('ref');
  });

  /**
   * The regression this whole slice exists for: logout used to clear only the
   * flag, leaving a usable bearer token on the device for the next user.
   */
  it('clears every session key on logout, not just the flag', () => {
    reducer(undefined, login({token: 'abc', refreshToken: 'ref'}));
    const state = reducer(undefined, logout());

    expect(state.isLoggedIn).toBe(false);
    expect(storage.getString(TOKEN_KEY)).toBeUndefined();
    expect(storage.getString(REFRESH_TOKEN_KEY)).toBeUndefined();
    expect(storage.getBoolean(IS_LOGGED_IN)).toBeUndefined();
  });

  it('restores a persisted session and finishes restoring', () => {
    reducer(undefined, login({token: 'abc'}));
    const state = reducer(undefined, restoreSession());
    expect(state.isLoggedIn).toBe(true);
    expect(state.isRestoring).toBe(false);
  });

  it('restores as signed out when nothing was persisted', () => {
    const state = reducer(undefined, restoreSession());
    expect(state.isLoggedIn).toBe(false);
    expect(state.isRestoring).toBe(false);
  });
});
