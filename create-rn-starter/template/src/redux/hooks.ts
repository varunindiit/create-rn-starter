import {useDispatch, useSelector, useStore} from 'react-redux';
import type {AppDispatch, RootState} from './store';

/**
 * Pre-typed Redux hooks.
 *
 * Use these instead of the bare `useDispatch` / `useSelector` everywhere:
 * `useAppSelector` infers `RootState` so selectors get autocomplete and are
 * checked, and `useAppDispatch` knows about thunks, so dispatching one is not
 * a type error.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof import('./store').default>();
