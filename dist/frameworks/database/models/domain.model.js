"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainModel = void 0;
const mongoose_1 = require("mongoose");
const domain_schema_1 = require("../schema/domain.schema");
exports.DomainModel = (0, mongoose_1.model)('Domain', domain_schema_1.domainSchema);
//# sourceMappingURL=domain.model.js.map