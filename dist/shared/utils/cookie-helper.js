"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = void 0;
const config_1 = require("../config");
const setCookies = (res, cookieName, cookieValue, signed = false, sameSite = 'lax') => {
    const isProduction = config_1.config.environment === 'production';
    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && sameSite === 'none' ? 'none' : 'lax',
        signed: signed,
        path: '/',
    });
};
exports.setCookies = setCookies;
//# sourceMappingURL=cookie-helper.js.map