"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestcaseModel = void 0;
const mongoose_1 = require("mongoose");
const testcase_schema_1 = require("../schema/testcase.schema");
exports.TestcaseModel = (0, mongoose_1.model)('Testcase', testcase_schema_1.testcaseSchema);
//# sourceMappingURL=testcase.model.js.map