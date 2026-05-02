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
  companyRegistrationProof: z
    .any()
    .refine((file) => file, {
      message: 'File is required',
    })
    .refine(
      (file) => {
        if (!file) return false;
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return validTypes.includes(file.mimetype);
      },
      {
        message: 'Only JPG, JPEG, and PNG files are allowed',
      }
    )
    .refine((file) => !file || file.size <= 1 * 1024 * 1024, {
      message: 'File size must be less than 1MB',
    }),
});
