
export type TRole = "admin" | "user" | "company";
export type TAuthProviders = "google" | "github" | "local";

export const ROLES = ["admin", "user", "company"];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
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
  VALIDATION_ERROR: "Validation error occurred",
  EMAIL_EXIST: "Email already exists",
  USERNAME_EXIST: "Username already exists",
  EMAIL_NOT_EXIST: "Email does not exist",
  OTP_EXPIRE: "Your One-Time Password has expired. Please request a new OTP.",
  INVALID_OTP: "Oops! The OTP you entered is incorrect.",
  NO_COOKIES: "Please register first",
  INVALID_CREDENTIALS: "Invalid credentials",
  TOKEN_MISSING: "Authorization token is required",
  TOKEN_EXPIRE: "Invalid or expired token",
  ACCESS_DENIED: "You do not have permission to access this resource",
  TOKEN_BLACKLIST: "Token has been revoked or blacklisted",
  REST_LINK_EXPIRE: "Invalid or expired password reset link",
  INVALID_AUTH_STATE: "Invalid_auth_state",
  INVALID_AUTH_CODE: "Invalid_auth_code",
  INVALID_AUTH_PROVIDER: "Invalid_auth_provider",
  INVALID_REQUEST: "Invalid request",
};
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "User registered successfully",
  SEND_OTP_TO_MAIL: "Successufully send otp to registered email",
  OTP_VERIFIED: "Otp verified successfully",
  USER_LOGIN: "User successfully login",
  SEND_PASSWORD_REST_LINK: "Successufully send password rest link to email",
  PASSWORD_REST: "Password rest successfully",
};

export const COOKIES_NAMES = {
  SIGNUP: "_secure_signup",
  REFRESH_TOKEN: "_secure_rt_auth",
  ACCESS_TOKEN: "_secure_at_auth",
  DEVICE_ID: "_dvid",
  GITHUB_SESSION: "_secure_gth",
};
