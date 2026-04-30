"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUsecaseMapper = void 0;
exports.LoginUsecaseMapper = {
    toResponse(account, user) {
        return {
            accountId: account._id,
            email: account.email,
            profileComplete: user?.isProfileComplete,
            profileUrl: account.profileUrl || '',
            role: account.role,
        };
    },
};
//# sourceMappingURL=register.usecase.mapper.js.map