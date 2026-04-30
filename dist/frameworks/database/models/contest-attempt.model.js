"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestAttemptModel = void 0;
const mongoose_1 = require("mongoose");
const contest_attempt_schema_1 = require("../schema/contest-attempt.schema");
exports.ContestAttemptModel = (0, mongoose_1.model)('ContestAttempt', contest_attempt_schema_1.contestAttemptSchema);
//# sourceMappingURL=contest-attempt.model.js.map