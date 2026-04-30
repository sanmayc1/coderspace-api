"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../schema/user.schema");
exports.UserModel = (0, mongoose_1.model)('User', user_schema_1.userSchema);
//# sourceMappingURL=user.model.js.map