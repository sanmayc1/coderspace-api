"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRegex = exports.gstinRegex = exports.usernameRegex3 = exports.usernameRegex2 = exports.usernameRegex1 = exports.strongEmailRegex = void 0;
exports.strongEmailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
exports.usernameRegex1 = /^@/;
exports.usernameRegex2 = /^@[a-z0-9_.]*$/;
exports.usernameRegex3 = /^@[a-z0-9_.]{4,}$/;
exports.gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
exports.searchRegex = /^[a-zA-Z0-9@. ]+$/;
//# sourceMappingURL=regex.js.map