"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose_1 = require("mongoose");
const company_schema_1 = require("../schema/company.schema");
exports.CompanyModel = (0, mongoose_1.model)('Company', company_schema_1.companySchema);
//# sourceMappingURL=company.model.js.map