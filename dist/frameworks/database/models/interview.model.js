"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewModel = void 0;
const mongoose_1 = require("mongoose");
const interview_schema_1 = require("../schema/interview.schema");
exports.InterviewModel = (0, mongoose_1.model)('Interview', interview_schema_1.interviewSchema);
//# sourceMappingURL=interview.model.js.map