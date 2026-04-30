"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModel = void 0;
const account_schema_1 = require("../schema/account.schema");
const mongoose_1 = require("mongoose");
exports.AccountsModel = (0, mongoose_1.model)('Account', account_schema_1.accountsSchema);
//# sourceMappingURL=account.model%20.js.map