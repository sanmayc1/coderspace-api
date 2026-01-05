import z from 'zod';
import { gstinRegex, strongEmailRegex } from '../../../../shared/validation/regex';
import { nameSchema, passwordSchema } from '../../../../shared/validation/schema';

export const CompanyRegisterSchema = z.object({
  name: nameSchema,
  email: z.string().trim().regex(strongEmailRegex, { message: 'Invalid email format' }),
  gstin: z.string().trim().regex(gstinRegex, {
    message: 'Invalid GSTIN',
  }),
  password: passwordSchema,
});
