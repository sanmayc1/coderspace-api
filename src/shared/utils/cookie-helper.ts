import { Response } from "express";
import { config } from "../config.js";

export const setCookies = (
  res: Response,
  cookieName: string,
  cookieValue: string,
  signed:boolean = false
) => {
  const isProduction = config.environment === "production";
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "none",
    signed:signed
  });
};
