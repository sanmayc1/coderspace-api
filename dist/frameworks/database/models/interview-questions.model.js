"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewQuestionsModel = void 0;
const mongoose_1 = require("mongoose");
const interview_questions_schema_1 = require("../schema/interview-questions.schema");
exports.InterviewQuestionsModel = (0, mongoose_1.model)('InterviewQuestions', interview_questions_schema_1.interviewQuestionsSchema);
//# sourceMappingURL=interview-questions.model.js.map