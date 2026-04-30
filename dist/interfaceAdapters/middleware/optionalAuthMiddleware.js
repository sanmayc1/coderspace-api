"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = void 0;
const auth_1 = require("../controllers/auth");
const optionalAuthMiddleware = (authMiddleware) => async (req, res, next) => {
    const accessToken = req.cookies[auth_1.COOKIES_NAMES.ACCESS_TOKEN];
    if (!accessToken) {
        req.user = undefined;
        return next();
    }
    return authMiddleware.handle(['user'])(req, res, next);
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
//# sourceMappingURL=optionalAuthMiddleware.js.map