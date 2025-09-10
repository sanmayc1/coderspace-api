import { z } from "zod";
import { usernameRegex1, usernameRegex2, usernameRegex3 } from "./regex.js";

export const nameSchema = z
  .string()
  .min(1, { message: "Name must be at least 2 characters long" })
  .trim()
  .regex(/^[a-zA-Z]/, {
    message: "Name must contain only alphabetic characters",
  });

export const usernameSchema = z
  .string()
  .lowercase({ message: "Username must be in lowercase only" })
  .trim()
  .regex(usernameRegex1, { message: "Username must start with @" })
  .regex(usernameRegex2, {
    message: "Username can only lowercase contain letters, numbers, and _",
  })
  .regex(usernameRegex3, {
    message: "Username must be at least 4 characters long",
  });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .trim()
  .regex(/[0-9]/, { message: "Password must contain at least one digit" })
  .regex(/[@$!%*?&]/, {
    message: "Password must contain at least one special character",
  });
