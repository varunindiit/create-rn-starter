import {apiSlice} from './apiSlice';
import type {UserProfile} from '../redux/slice/userProfile';

/**
 * Example endpoints.
 *
 * `injectEndpoints` keeps each feature's queries next to that feature instead
 * of growing one giant API file — copy this pattern into `src/screen/<feature>/`
 * as the app grows. Point `REACT_APP_API` at a real backend in `.env` and these
 * work as-is; until then the screens fall back to the seeded Redux state.
 */
export const profileApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({url: '/me', method: 'get'}),
      providesTags: ['Profile'],
    }),

    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: body => ({url: '/me', method: 'patch', data: body}),
      // Refetching `Profile` after a successful write means no screen has to
      // remember to refresh itself.
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = profileApi;
