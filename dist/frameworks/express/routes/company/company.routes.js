"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRoutes = void 0;
const async_handler_1 = require("../../../../shared/async-handler");
const di_resolver_1 = require("../../../di/di-resolver");
const base_route_1 = require("../base-route");
class CompanyRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company'])).bind(di_resolver_1.authMiddleware), di_resolver_1.companyController.getCompany.bind(di_resolver_1.companyController));
        this.router.patch('/', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company'])).bind(di_resolver_1.authMiddleware), di_resolver_1.companyController.updateProfile.bind(di_resolver_1.companyController));
        this.router.use('/contests', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company'])).bind(di_resolver_1.authMiddleware), di_resolver_1.contestRoutes.router);
        this.router.get('/dashboard', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['company'])).bind(di_resolver_1.authMiddleware), di_resolver_1.companyController.getDashboard.bind(di_resolver_1.companyController));
    }
}
exports.CompanyRoutes = CompanyRoutes;
//# sourceMappingURL=company.routes.js.map