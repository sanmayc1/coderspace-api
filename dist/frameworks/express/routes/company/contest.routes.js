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
exports.ContestRoute = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const di_resolver_1 = require("../../../di/di-resolver");
let ContestRoute = class ContestRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post('/', di_resolver_1.companyContestController.createContest.bind(di_resolver_1.companyContestController));
        this.router.get('/', di_resolver_1.companyContestController.getAllContests.bind(di_resolver_1.companyContestController));
        this.router.patch('/', di_resolver_1.companyContestController.updateContest.bind(di_resolver_1.companyContestController));
        this.router.delete('/:id', di_resolver_1.companyContestController.deleteContest.bind(di_resolver_1.companyContestController));
        this.router.get('/problems', di_resolver_1.companyContestController.getAllAvailableProblems.bind(di_resolver_1.companyContestController));
        this.router.get('/:id', di_resolver_1.companyContestController.getContestById.bind(di_resolver_1.companyContestController));
    }
};
exports.ContestRoute = ContestRoute;
exports.ContestRoute = ContestRoute = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ContestRoute);
//# sourceMappingURL=contest.routes.js.map