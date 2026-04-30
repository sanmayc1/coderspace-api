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
exports.ProblemManagementRoutes = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const di_resolver_1 = require("../../../di/di-resolver");
const async_handler_1 = require("../../../../shared/async-handler");
let ProblemManagementRoutes = class ProblemManagementRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post('/', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.createProblem.bind(di_resolver_1.problemManagementController)));
        this.router.get('/', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.getAllProblems.bind(di_resolver_1.problemManagementController)));
        this.router.get('/:id', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.getProblem.bind(di_resolver_1.problemManagementController)));
        this.router.patch('/', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.updateProblem.bind(di_resolver_1.problemManagementController)));
        this.router.patch('/visibility', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.changeVisibility.bind(di_resolver_1.problemManagementController)));
        this.router.post('/language', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.addLanguage.bind(di_resolver_1.problemManagementController)));
        this.router.get('/:id/language/', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.getLanguage.bind(di_resolver_1.problemManagementController)));
        this.router.patch('/language', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.updateLanguage.bind(di_resolver_1.problemManagementController)));
        this.router.post('/testcase', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.addSingleTestcase.bind(di_resolver_1.problemManagementController)));
        this.router.get('/:id/testcases', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.getAllTestcases.bind(di_resolver_1.problemManagementController)));
        this.router.delete('/:id/testcase', (0, async_handler_1.asyncHandler)(di_resolver_1.problemManagementController.deleteTestcase.bind(di_resolver_1.problemManagementController)));
        this.router.post("/testcase/auto-generate", di_resolver_1.problemManagementController.autoGenerateTestcases.bind(di_resolver_1.problemManagementController));
    }
};
exports.ProblemManagementRoutes = ProblemManagementRoutes;
exports.ProblemManagementRoutes = ProblemManagementRoutes = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ProblemManagementRoutes);
//# sourceMappingURL=problem-management.route.js.map