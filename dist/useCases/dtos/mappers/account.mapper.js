"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDtoMapper = void 0;
exports.accountDtoMapper = {
    toEntity(data) {
        return {
            name: data.name,
            email: data.email,
            password: data.password,
        };
    },
};
//# sourceMappingURL=account.mapper.js.map