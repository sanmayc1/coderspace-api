"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSessionModel = void 0;
const mongoose_1 = require("mongoose");
const interview_session_schema_1 = require("../schema/interview-session.schema");
exports.InterviewSessionModel = (0, mongoose_1.model)('InterviewSession', interview_session_schema_1.interviewSessionSchema);
//# sourceMappingURL=interview-session.js.map