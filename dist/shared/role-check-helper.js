"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validRole = void 0;
const validRole = (role) => {
    const roles = ['admin', 'company', 'user'];
    return roles.includes(role);
};
exports.validRole = validRole;
//# sourceMappingURL=role-check-helper.js.map