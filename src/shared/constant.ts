

export type TRole = "admin" | "user" 

export const ROLES =["admin","user"] 


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
 SERVER_ERROR: "An error occurred, please try again later.",
   VALIDATION_ERROR: "Validation error occurred.",
 
};