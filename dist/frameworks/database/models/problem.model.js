"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemModel = void 0;
const mongoose_1 = require("mongoose");
const problem_schema_1 = require("../schema/problem.schema");
exports.ProblemModel = (0, mongoose_1.model)('Problem', problem_schema_1.problemSchema);
//# sourceMappingURL=problem.model.js.map