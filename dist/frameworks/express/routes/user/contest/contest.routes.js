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
exports.UserContestRoute = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../../base-route");
const di_resolver_1 = require("../../../../di/di-resolver");
const async_handler_1 = require("../../../../../shared/async-handler");
let UserContestRoute = class UserContestRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/upcoming-and-ongoing', (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.getAllUpcomingAndOngoingContests.bind(di_resolver_1.userContestController)));
        this.router.get('/past', (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.getAllPastContests.bind(di_resolver_1.userContestController)));
        this.router.get('/:id', (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.getContestProblems.bind(di_resolver_1.userContestController)));
        this.router.post('/submit/problem', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.submitProblem.bind(di_resolver_1.userContestController)));
        this.router.post('/join', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.joinContest.bind(di_resolver_1.userContestController)));
        this.router.post('/finish', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.userContestController.finishContest.bind(di_resolver_1.userContestController)));
        // this.router.get(
        //   '/:id/leaderboard',
        //   asyncHandler(userContestController.getContestLeaderboard.bind(userContestController))
        // );
    }
};
exports.UserContestRoute = UserContestRoute;
exports.UserContestRoute = UserContestRoute = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], UserContestRoute);
//# sourceMappingURL=contest.routes.js.map