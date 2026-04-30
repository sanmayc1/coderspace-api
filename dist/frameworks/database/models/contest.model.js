"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestModel = void 0;
const mongoose_1 = require("mongoose");
const contest_schema_1 = require("../schema/contest.schema");
exports.ContestModel = (0, mongoose_1.model)('Contest', contest_schema_1.contestSchema);
//# sourceMappingURL=contest.model.js.map