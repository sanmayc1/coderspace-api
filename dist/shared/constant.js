"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERVIEW_STATUS = exports.STATUS = exports.CONTEST_SCORE_BASED_ON_DIFFICULTY = exports.availableLanguages = exports.templateCodes = exports.VALIDATORS = exports.VALIDATOR_TYPE = exports.COOKIES_NAMES = exports.SUCCESS_MESSAGES = exports.ERROR_MESSAGES = exports.SCORES = exports.HTTP_STATUS = exports.PAYMENT_STATUS_ENUM = exports.VIEW = exports.DIFFICULTY = exports.BADGE = exports.AUTHPROVIDER = exports.ROLES = exports.LANGUAGES = void 0;
const testcase_validators_1 = require("./utils/testcase-validators");
exports.LANGUAGES = ['typescript', 'java', 'javascript', 'python'];
exports.ROLES = ['admin', 'user', 'company'];
exports.AUTHPROVIDER = ['github', 'google', 'local'];
exports.BADGE = ['silver', 'gold', 'platinum'];
exports.DIFFICULTY = ['easy', 'medium', 'hard'];
exports.VIEW = ['public', 'private'];
exports.PAYMENT_STATUS_ENUM = ['pending', 'success', 'failed'];
exports.HTTP_STATUS = {
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
exports.SCORES = {
    'easy': 1,
    'medium': 2,
    'hard': 3
};
exports.ERROR_MESSAGES = {
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
    DIFFERENT_AUTHPROVIDER: 'This account was registered using Google/GitHub. Password reset is not available',
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
    PLAN_NOT_FOUND: 'Plan not found',
    PAYMENT_NOT_FOUND: 'Payment not found',
    PAYMENT_VERIFICATION_FAILED: 'Payment verification failed',
    SUBSCRIPTION_ALREADY_EXISTS: 'Subscription already exists',
    PREMIUM_REQUIRED: 'Access denied, premium required',
    CONTEST_NOT_FOUND: 'Contest not found',
    CONTEST_ENDED: 'Contest ended',
    CONTEST_NOT_STARTED: 'Contest not started',
    CONTEST_ATTEMPT_NOT_FOUND: 'Contest attempt not found.Invalid join',
    CONTEST_ALREADY_JOINED: 'Contest already joined',
    NEED_MINIMUM_TESTCASE: "Atleast one test case needed to auto generate please add that",
    INTERVIEW_NOT_FOUND: "Interview not found",
    SESSION_ALREADY_EXISTS: "You have already appeared for this interview",
    INTERVIEW_QUESTION_NOT_FOUND: "Interview question not found",
    INVALID_CURRENT_PASSWORD: "Invalid current password",
    SESSION_NOT_FOUND: "Session not found",
    QUESTIONS_NOT_FOUND: "Questions not found",
    TESTCASE_ALREADY_EXISTS: "Testcase already exists",
    NO_LANGUAGE_ADDED_TO_PROBLEM: "Please add one language to the problem before adding testcase",
    NO_TESTCASE_ADDED: "Please add one testcase to the problem before changing visibility",
};
exports.SUCCESS_MESSAGES = {
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
    SINGLE_TESTCASE_VALIDATED: 'Single testcase validated successfully',
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
    GET_ALL_PLANS: 'Plans fetched successfully',
    CREATE_RAZORPAY_ORDER: 'Razorpay order created successfully',
    VERIFY_PAYMENT: 'Payment verified successfully',
    MARK_FAILED_PAYMENT: 'Payment marked failed successfully',
    CONTEST_FETCHED: 'Contest fetched successfully',
    CONTEST_UPDATED: 'Contest updated successfully',
    CONTEST_DELETED: 'Contest deleted successfully',
    CONTEST_PROBLEMS_FETCHED: 'Contest problems fetched successfully',
    CONTEST_JOINED: 'Contest joined successfully',
    PROBLEMS_FETCHED: "Problems fetched successfully",
    CONTEST_FINISHED: 'Contest finished successfully',
    CONTEST_LEADERBOARD_FETCHED: 'Contest leaderboard fetched successfully',
    TEST_CASE_AUTO_GENERATE: "Testcase auto generate successfully",
    CHAT_FETCHED: "Chats fetched successfully",
    INTERVIEW_CREATED: "Interview created successfully",
    INTERVIEWS_FETCHED: "Interviews fetched successfully",
    INTERVIEW_DELETED: "Interview deleted successfully",
    INTERVIEW_SESSION_CREATED: "Interview session created successfully",
    INTERVIEW_QUESTION_FETCHED: "Interview question fetched successfully",
    ACCOUNT_PASSWORD_CHANGED: "Account password changed successfully",
    DASHBOARD_FETCHED: "Dashboard fetched successfully",
    ANSWER_SUBMITTED: "Answer submitted successfully",
    INTERVIEW_FINISHED: "Interview finished successfully",
    INTERVIEW_FEEDBACK_FETCHED: "Interview feedback fetched successfully",
};
exports.COOKIES_NAMES = {
    SIGNUP: '_secure_signup',
    REFRESH_TOKEN: '_secure_rt_auth',
    ACCESS_TOKEN: '_secure_at_auth',
    DEVICE_ID: '_dvid',
    GITHUB_SESSION: '_secure_gth',
};
exports.VALIDATOR_TYPE = ['exactMatch', 'unorderedArray'];
exports.VALIDATORS = {
    exactMatch: testcase_validators_1.validatorForExactMatch,
    unorderedArray: testcase_validators_1.validatorForUnorderedArray,
};
exports.templateCodes = {
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
exports.availableLanguages = {
    java: { name: 'java', extension: 'java', version: '15.0.2' },
    typescript: { name: 'typescript', extension: 'ts', version: '5.0.3' },
    python: { name: 'python', extension: 'py', version: '3.12.0' },
    javascript: { name: 'javascript', extension: 'js', version: '20.11.1' },
};
exports.CONTEST_SCORE_BASED_ON_DIFFICULTY = {
    easy: 100,
    medium: 200,
    hard: 300,
};
exports.STATUS = ['attempted', 'solved'];
exports.INTERVIEW_STATUS = ["ongoing", "completed", "partially_completed"];
//# sourceMappingURL=constant.js.map