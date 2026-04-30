"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRepository = void 0;
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const account_model_1 = require("../../frameworks/database/models/account.model ");
const base_repository_1 = require("./base-repository");
class AccountRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(account_model_1.AccountsModel, dto_mapper_1.accountRepositoryMapper.toEntity, dto_mapper_1.accountRepositoryMapper.toModel);
    }
    async setAccountVerified(email) {
        await account_model_1.AccountsModel.findOneAndUpdate({ email }, { isVerified: true });
    }
    async findByEmail(email) {
        const doc = await account_model_1.AccountsModel.findOne({ email });
        return doc ? dto_mapper_1.accountRepositoryMapper.toEntity(doc) : null;
    }
}
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=account-repository.js.map