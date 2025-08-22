export type TRole = "admin" | "user";

export const ROLES = ["admin", "user"];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  SERVER_ERROR: "An error occurred, please try again later.",
  VALIDATION_ERROR: "Validation error occurred.",
  EMAIL_EXIST: "Email already exists",
  USER_NAME_EXIST: "Username already exists",
  EMAIL_NOT_EXIST: "Email does not exist",
  OTP_EXPIRE: "Your One-Time Password has expired. Please request a new OTP.",
  INVALID_OTP: "The OTP you entered is incorrect. Please try again.",
  NO_COOKIES: "please register first",
  INVALID_CREDENTIALS: "Invalid credentials",
  TOKEN_MISSING: "Authorization token is required",
  TOKEN_EXPIRE: "Invalid or expired token",
  ACCESS_DENIED: "You do not have permission to access this resource",
  TOKEN_BLACKLIST: "Token has been revoked or blacklisted",
};
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "User registered successfully",
  SEND_OTP_TO_MAIL: "Successufully send otp to registered email",
  OTP_VERIFIED: "Otp verified successfully",
  USER_LOGIN: "User successfully login",
};

export const COOKIES_NAMES = {
  SIGNUP: "_secure_signup",
  REFRESH_TOKEN: "_secure_rt_auth",
  ACCESS_TOKEN: "_secure_at_auth",
  DEVICE_ID: "_dvid",
};
