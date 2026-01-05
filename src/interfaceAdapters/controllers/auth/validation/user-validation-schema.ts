import z from 'zod';
import { nameSchema, passwordSchema, usernameSchema } from '../../../../shared/validation/schema';
import { strongEmailRegex } from '../../../../shared/validation/regex';

export const UserSchema = z
  .object({
    name: nameSchema,
    email: z.string().regex(strongEmailRegex, { message: 'Invalid email format' }),
    username: usernameSchema,
    password: passwordSchema,
  })
  .strict();

export const PasswordSchema = z.object({
  password: passwordSchema,
});

export const UpdatePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

export const LoginSchema = z.object({
  email: z.string().regex(strongEmailRegex, { message: 'Invalid email format' }),
  password: z.string().min(7, { message: 'Invalid credentials' }),
});
