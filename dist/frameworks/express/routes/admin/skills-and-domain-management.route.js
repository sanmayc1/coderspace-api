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
exports.SkillsAndDomainManagementRoute = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../base-route");
const di_resolver_1 = require("../../../di/di-resolver");
let SkillsAndDomainManagementRoute = class SkillsAndDomainManagementRoute extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.post('/domain', di_resolver_1.skillAndDomainManagementController.createDomain.bind(di_resolver_1.skillAndDomainManagementController));
        this.router.get('/domains', di_resolver_1.skillAndDomainManagementController.getAllDomains.bind(di_resolver_1.skillAndDomainManagementController));
        this.router.delete('/domain/:id', di_resolver_1.skillAndDomainManagementController.deleteDomain.bind(di_resolver_1.skillAndDomainManagementController));
        this.router.post('/skill', di_resolver_1.skillAndDomainManagementController.createSkill.bind(di_resolver_1.skillAndDomainManagementController));
        this.router.delete('/skill/:id', di_resolver_1.skillAndDomainManagementController.deleteSkill.bind(di_resolver_1.skillAndDomainManagementController));
    }
};
exports.SkillsAndDomainManagementRoute = SkillsAndDomainManagementRoute;
exports.SkillsAndDomainManagementRoute = SkillsAndDomainManagementRoute = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SkillsAndDomainManagementRoute);
//# sourceMappingURL=skills-and-domain-management.route.js.map