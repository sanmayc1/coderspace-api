import z from "zod";
import { BADGE, DIFFICULTY } from "../../../../shared/constant.js";

export const UserProfileUpdateSchema = z.object({
  level: z
    .number({message:"Please Enter a valid level"})
    .max(100, { message: "Maximum Level 100" })
    .refine((val) => !isNaN(val), {
      message: "Please Enter a valid level",
    }),
  badge: z
    .string({message:"Please Enter a valid badge"})
    .refine((val) => BADGE.includes(val), { message: "Please Enter a valid badge" }),
  userId:z.string().min(1,"Invalid UserId")
});



const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  constrain: z.string().min(1, "Constraint is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(DIFFICULTY),
  domain: objectId,
  premium: z.boolean(),
  skills: z.array(objectId).nonempty("Skills array cannot be empty"),
  examples: z.array(
    z.object({
      id: z.string().min(8,"Example ID must be a valid"),
      explanation: z.string().min(1, "Explanation is required"),
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
    })
  ).nonempty("At least one example is required"),
});




export const querySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default(1),
  sortBy: z.string().optional().default("createdAt"),
  search: z.string().optional().default(""),
});
