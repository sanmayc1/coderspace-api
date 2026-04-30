"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitProblemModel = void 0;
const mongoose_1 = require("mongoose");
const submit_problem_schema_1 = require("../schema/submit-problem.schema");
exports.SubmitProblemModel = (0, mongoose_1.model)('SubmitProblem', submit_problem_schema_1.submitProblemSchema);
//# sourceMappingURL=submit-problem.model.js.map