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
exports.PaymentsManagementRoutes = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const async_handler_1 = require("../../../../shared/async-handler");
const di_resolver_1 = require("../../../di/di-resolver");
let PaymentsManagementRoutes = class PaymentsManagementRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/plans', (0, async_handler_1.asyncHandler)(di_resolver_1.paymentsManagementController.getAllPlans.bind(di_resolver_1.paymentsManagementController)));
        this.router.patch('/plans/edit', (0, async_handler_1.asyncHandler)(di_resolver_1.paymentsManagementController.editPlan.bind(di_resolver_1.paymentsManagementController)));
        this.router.get('/', (0, async_handler_1.asyncHandler)(di_resolver_1.paymentsManagementController.getAllPayments.bind(di_resolver_1.paymentsManagementController)));
    }
};
exports.PaymentsManagementRoutes = PaymentsManagementRoutes;
exports.PaymentsManagementRoutes = PaymentsManagementRoutes = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], PaymentsManagementRoutes);
//# sourceMappingURL=payments.routes.js.map