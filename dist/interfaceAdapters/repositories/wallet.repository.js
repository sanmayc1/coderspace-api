"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepository = void 0;
const wallet_model_1 = require("../../frameworks/database/models/wallet.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const base_repository_1 = require("./base-repository");
class WalletRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(wallet_model_1.WalletModel, dto_mapper_1.walletMapper.toEntity, dto_mapper_1.walletMapper.toModel);
    }
}
exports.WalletRepository = WalletRepository;
//# sourceMappingURL=wallet.repository.js.map