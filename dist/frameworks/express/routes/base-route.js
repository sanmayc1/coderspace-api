"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
const express_1 = require("express");
class BaseRoute {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=base-route.js.map