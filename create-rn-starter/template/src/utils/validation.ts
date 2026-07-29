import {z} from 'zod';

/**
 * Form schemas.
 *
 * Keeping them here rather than inline in the screen means the same rules can
 * be reused by a server-side check, a deep-link handler or a test, and the
 * inferred types (`LoginValues`) stay in lockstep with the validation.
 *
 * Messages are i18n keys, not sentences — the resolver output is passed through
 * `t()` at render time so validation errors are translated like everything else.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'validation.emailRequired'})
    .email({message: 'validation.emailInvalid'}),
  password: z
    .string()
    .min(1, {message: 'validation.passwordRequired'})
    .min(8, {message: 'validation.passwordTooShort'}),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(2, {message: 'validation.nameTooShort'}),
  email: z.string().email({message: 'validation.emailInvalid'}),
  phone: z.string().min(6, {message: 'validation.phoneInvalid'}),
  about: z.string().max(280, {message: 'validation.aboutTooLong'}).optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
