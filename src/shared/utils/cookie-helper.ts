import { Response } from "express";
import { config } from "../config.js";

export const setCookies = (
  res: Response,
  cookieName: string,
  cookieValue: string
) => {
  const isProduction = config.environment === "production";
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "none",
  });
};
