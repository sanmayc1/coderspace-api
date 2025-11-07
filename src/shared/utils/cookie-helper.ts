import { Response } from "express";
import { config } from "../config.js";

export const setCookies = (
  res: Response,
  cookieName: string,
  cookieValue: string,
  signed: boolean = false,
  sameSite: "lax" | "none" | "strict" = "lax"
) => {
  const isProduction = config.environment === "production";
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && sameSite === "none" ? "none":'lax',
    signed: signed,
    path:"/"
  });
};
