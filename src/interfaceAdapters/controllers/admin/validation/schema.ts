import z from "zod";
import { BADGE } from "../../../../shared/constant.js";

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
