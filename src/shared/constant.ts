import { validatorForExactMatch, validatorForUnorderedArray } from "./utils/testcase-validators";

export type TRole = 'admin' | 'user' | 'company';
export type TAuthProviders = 'google' | 'github' | 'local';
export type TBadge = 'silver' | 'gold' | 'platinum';
export type TDifficulty = 'easy' | 'medium' | 'hard';
export type TLanguages = 'javascript' | 'java' | 'python' | 'typescript';
export const LANGUAGES: TLanguages[] = ['typescript', 'java', 'javascript', 'python'];

export const ROLES = ['admin', 'user', 'company'];
export const AUTHPROVIDER = ['github', 'google', 'local'];
export const BADGE = ['silver', 'gold', 'platinum'];
export const DIFFICULTY: TDifficulty[] = ['easy', 'medium', 'hard'];
export type TView = 'public' | 'private';
export const VIEW: TView[] = ['public', 'private'];

type FilterOp = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'contains';

interface FilterCondition {
  op: FilterOp;
  value: any;
}

export type GenericFilter = Record<string, FilterCondition | FilterCondition[]>;

type SortOrder = 'asc' | 'desc';

export type Sort = Record<string, SortOrder>;

export type Projection = string[];

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
  SERVER_ERROR: 'An error occurred, please try again later.',
  VALIDATION_ERROR: 'Validation error occurred',
  EMAIL_EXIST: 'Email already exists',
  USERNAME_EXIST: 'Username already exists',
  EMAIL_NOT_EXIST: 'Email does not exist',
  OTP_EXPIRE: 'Your One-Time Password has expired. Please request a new OTP.',
  INVALID_OTP: 'Oops! Entered OTP is incorrect',
  NO_COOKIES: 'Please register first',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_MISSING: 'Authorization token is required',
  TOKEN_EXPIRE: 'Invalid or expired token',
  ACCESS_DENIED: 'You do not have permission to access this resource',
  TOKEN_BLACKLIST: 'Token has been revoked or blacklisted',
  REST_LINK_EXPIRE: 'Invalid or expired password reset link',
  INVALID_AUTH_STATE: 'Invalid_auth_state',
  INVALID_AUTH_CODE: 'Invalid_auth_code',
  INVALID_AUTH_PROVIDER: 'Invalid_auth_provider',
  INVALID_REQUEST: 'Invalid request',
  ACCOUNT_NOT_VERIFIED: 'Account not verified. Please complete OTP verification',
  ACCOUNT_NOT_FOUND: 'Account not found',
  COMPANY_NOT_FOUND: 'Company not found',
  DIFFERENT_AUTHPROVIDER:
    'This account was registered using Google/GitHub. Password reset is not available',
  AUTH_ACCESS_DENIED: 'Login access denied',
  GSTIN_EXIST: 'GSTIN already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_BODY: 'Invalid body',
  INVALID_QUERY: 'Oops! Something went wrong with your request',
  PAGE_NOT_NUMBER: 'Page must be a positive number',
  LIMIT_NOT_NUMBER: 'Limit must be a positive number',
  INVALID_SORT: 'Invalid sort value',
  INVALID_SEARCH: 'Search query contains invalid characters',
  UPTODATE: 'Same data received, no changes applied',
  ACCOUNT_BLOCKED: 'Account blocked contact support',
  ACCOUNT_BLOCKED_FORCE_LOGOUT: 'Your Account blocked by admin',
  FORCE_LOGOUT: 'Session Expired',
  DOMAIN_EXIST: 'Domain already exits',
  DOMAIN_NOT_FOUND: 'Domain not found',
  SKILL_EXIST: 'Skill already exits',
  SKILL_NOT_FOUND: 'Skill not found',
  LANGUAGE_NOT_AVAILABLE: 'Selected language is not available',
  LANGUAGES_NOT_FOUND: 'Language is not found',
  TESTCASE_NOT_FOUND: 'Testcase is not found',
  PROBLEM_NOT_FOUND: 'Problem not found',
  NO_LANGUAGE_ADDED: 'Please add one language to change visibility',
  OLD_PASSWORD_AND_NEW_PASSWORD_SAME: 'Old password and new password same',
  USER_ALREADY_FOLLOWING: 'User already following',
  USER_NOT_FOLLOWING: 'User not following',
  INVALID_LANGUAGE: 'Invalid language',
  WRONG_ANSWER: 'Test Case Failed',
};
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  COMPANY_REGISTERED: 'Company registered successfully',
  SEND_OTP_TO_MAIL: 'Successufully send otp to registered email',
  OTP_VERIFIED: 'Otp verified successfully',
  LOGIN: 'successfully logined',
  SEND_PASSWORD_REST_LINK: 'Successufully send password rest link to email',
  PASSWORD_REST: 'Password rest successfully',
  ACCOUNT_DETAILS: 'Account details fetched successfully',
  LOGOUT: 'Logout successfully',
  TOKEN_REFRESH: 'Access token refreshed successfully',
  USERS_FETCHED: 'Users fetched Successfully',
  USER_FETCHED: 'User fetched Successfully',
  SUGGESTION_LEVEL: 'Suggestion level updated successfully',
  UPDATED: 'Successfully Updated',
  STATUS_UPDATED: 'User Status updated successfully',
  COMPANY_FETCHED: 'Company fetched Successfully',
  DOMAIN_CREATED: 'Domain successfully created',
  GET_ALL_DOMAINS: 'Domains fetched successfully',
  DOMAIN_DELETED: 'Domain successfully deleted',
  SKILL_CREATED: 'Skill successfully created',
  GET_ALL_SKILLS: 'Skills fetched successfully',
  SKILL_DELETED: 'Skill successfully deleted',
  PROBLEM_CREATED: 'Problem created successfully',
  GET_ALL_PROBLEMS: 'Fetched all problems',
  LANGUAGE_ADDED: 'Language Successfully added',
  LANGUAGES_FETCHED: 'Language successfully fetched',
  LANGUAGE_UPDATED: 'Language updated successfully',
  SINGLE_TESTCASE_ADDED: 'Single testcase added successfully',
  GET_TESTCASES: 'Testcase successfully fetched',
  TESTCASE_DELETED: 'Testcase successfully deleted',
  GET_PROBLEM: 'Problem fetched successfully',
  PROBLEM_UPDATED: 'Problem updated successfully',
  VISIBILITY_CHANGED: 'Problem visibility changed successfully',
  COMPANY_UPDATED: 'Company profile updated',
  CONTEST_CREATED: 'Contest created successfully',
  CONTESTS_FETCHED: 'Contests fetched successfully',
  USER_PROFILE_UPDATED: 'User profile updated successfully',
  PASSWORD_UPDATED: 'Password updated successfully',
  GET_ALL_CODERS: 'Users fetched Successfully',
  FOLLOW_CODER: 'User followed successfully',
  UNFOLLOW_CODER: 'User unfollowed successfully',
  GET_CODER: 'Coder fetched successfully',
  RUN_PROBLEM: 'Problem run successfully',
  SUBMIT_PROBLEM: 'Problem submitted successfully',
};

export const COOKIES_NAMES = {
  SIGNUP: '_secure_signup',
  REFRESH_TOKEN: '_secure_rt_auth',
  ACCESS_TOKEN: '_secure_at_auth',
  DEVICE_ID: '_dvid',
  GITHUB_SESSION: '_secure_gth',
};


export const VALIDATOR_TYPE = ['exactMatch', 'unorderedArray']

export const VALIDATORS = {
    exactMatch: validatorForExactMatch,
    unorderedArray: validatorForUnorderedArray
}

export const templateCodes: Record<TLanguages, string> = {
  java: `
class Solution {
    public int solve(int n) {
        

        return 0;
    }
}
`,
  typescript: `
  function solve(num: number): number {
    
};
`,

  python: `
class Solution:
    def solve(self, n):
        

        return 0
`,

  javascript: `
var solve = function(n) {
    

    return 0;
}
`,
};



export const availableLanguages = {
    java: {name: 'java', extension: 'java',version: '15.0.2'},
    typescript: {name: 'typescript', extension: 'ts',version: '5.0.3'},
    python: {name: 'python', extension: 'py',version: '3.12.0'},
    javascript: {name: 'javascript', extension: 'js',version: '20.11.1'},
}



export type TStatus = 'attempted' | 'solved' 
export const STATUS:TStatus[]=['attempted','solved']