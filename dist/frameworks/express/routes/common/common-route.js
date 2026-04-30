"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoute = void 0;
const async_handler_1 = require("../../../../shared/async-handler");
const di_resolver_1 = require("../../../di/di-resolver");
const base_route_1 = require("../base-route");
class CommonRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/skills', (0, async_handler_1.asyncHandler)(di_resolver_1.commonController.getAllSkills.bind(di_resolver_1.commonController)));
        this.router.get('/contest/:id/leaderboard', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company', 'user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.commonController.getContestLeaderboard.bind(di_resolver_1.commonController)));
        this.router.patch('/change-password', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company', 'admin']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.commonController.changeAccountPassword.bind(di_resolver_1.commonController)));
        this.router.use('/notifications', di_resolver_1.notificationRoute.router);
    }
}
exports.CommonRoute = CommonRoute;
//# sourceMappingURL=common-route.js.map