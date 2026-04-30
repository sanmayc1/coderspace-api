"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = void 0;
const mongoose_1 = require("mongoose");
const wallet_schema_1 = require("../schema/wallet.schema");
exports.WalletModel = (0, mongoose_1.model)('Wallet', wallet_schema_1.walletSchema);
//# sourceMappingURL=wallet.model.js.map