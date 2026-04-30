"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const di_resolver_1 = require("../../../di/di-resolver");
const async_handler_1 = require("../../../../shared/async-handler");
let AdminRoutes = class AdminRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.use('/users', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin']).bind(di_resolver_1.authMiddleware)), di_resolver_1.userManagementRoute.router);
        this.router.use('/problems', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin']).bind(di_resolver_1.authMiddleware)), di_resolver_1.problemManagementRoutes.router);
        this.router.use('/', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin', 'company'])).bind(di_resolver_1.authMiddleware), di_resolver_1.skillsAndDomainManagementRoute.router);
        this.router.use('/payments', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin']).bind(di_resolver_1.authMiddleware)), di_resolver_1.paymentsManagementRoutes.router);
        this.router.use('/interviews', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin']).bind(di_resolver_1.authMiddleware)), di_resolver_1.interviewAdminRoutes.router);
        this.router.use('/dashboard', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['admin']).bind(di_resolver_1.authMiddleware)), di_resolver_1.adminDashboardRoute.router);
    }
};
exports.AdminRoutes = AdminRoutes;
exports.AdminRoutes = AdminRoutes = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AdminRoutes);
//# sourceMappingURL=admin.routes.js.map