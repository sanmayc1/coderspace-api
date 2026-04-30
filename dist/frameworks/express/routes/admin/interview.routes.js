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
exports.InterviewAdminRoutes = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const async_handler_1 = require("../../../../shared/async-handler");
const di_resolver_1 = require("../../../di/di-resolver");
let InterviewAdminRoutes = class InterviewAdminRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post('/create', (0, async_handler_1.asyncHandler)(di_resolver_1.interviewManagementAdminController.createInterview.bind(di_resolver_1.interviewManagementAdminController)));
        this.router.get('/', (0, async_handler_1.asyncHandler)(di_resolver_1.interviewManagementAdminController.getAllInterviews.bind(di_resolver_1.interviewManagementAdminController)));
        this.router.delete('/:id/delete', (0, async_handler_1.asyncHandler)(di_resolver_1.interviewManagementAdminController.deleteInterview.bind(di_resolver_1.interviewManagementAdminController)));
    }
};
exports.InterviewAdminRoutes = InterviewAdminRoutes;
exports.InterviewAdminRoutes = InterviewAdminRoutes = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], InterviewAdminRoutes);
//# sourceMappingURL=interview.routes.js.map