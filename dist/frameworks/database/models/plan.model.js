"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const mongoose_1 = require("mongoose");
const plan_schema_1 = require("../schema/plan.schema");
exports.PlanModel = (0, mongoose_1.model)('Plan', plan_schema_1.planSchema);
//# sourceMappingURL=plan.model.js.map