import z from 'zod';
import { nameSchema, usernameSchema } from '../../../../shared/validation/schema';

export const userProfileUpdateSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  about: z.string().min(10, 'About must be at least 10 characters long').max(100).optional(),
});
