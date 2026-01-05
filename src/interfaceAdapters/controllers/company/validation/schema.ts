import z from 'zod';
import { VIEW } from '../../../../shared/constant';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

const rewardSchema = z.object({
  rank: z
    .number({ message: 'Rank must be a number' })
    .int({ message: 'Rank must be an integer' })
    .positive({ message: 'Rank must be greater than 0' }),
  description: z.string().min(1, 'Reward description is required'),
});

export const createContestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  domain: objectId,
  skills: z.array(objectId).nonempty('At least one skill is required'),
  problems: z.array(objectId).nonempty('At least one problem is required'),
  rewards: z.array(rewardSchema).nonempty('At least one reward is required'),
  dateAndTime: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'dateAndTime must be a valid ISO string',
  }),
  duration: z
    .number({ message: 'Duration must be a number' })
    .int({ message: 'Duration must be an integer' })
    .positive({ message: 'Duration must be greater than 0' }),
  visibility: z.enum(VIEW),
});

export const companyContestQuerySchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().int().positive().optional().default(1),
});
