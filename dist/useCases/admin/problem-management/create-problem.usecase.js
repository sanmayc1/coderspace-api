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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProblemUsecase = void 0;
const tsyringe_1 = require("tsyringe");
let CreateProblemUsecase = class CreateProblemUsecase {
    _problemRepository;
    constructor(_problemRepository) {
        this._problemRepository = _problemRepository;
    }
    async execute(data) {
        const problemCount = await this._problemRepository.findProblemCount();
        await this._problemRepository.create({
            title: data.title.toLowerCase(),
            description: data.description,
            constraints: data.constrain,
            difficulty: data.difficulty,
            domainId: data.domain,
            examples: data.examples.map((e) => ({
                explanation: e.explanation,
                input: e.input,
                output: e.output,
            })),
            isPremium: data.premium,
            problemNumber: problemCount + 1,
            skillsIds: data.skills,
            validatorType: data.validationType,
        });
    }
};
exports.CreateProblemUsecase = CreateProblemUsecase;
exports.CreateProblemUsecase = CreateProblemUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IProblemRepository')),
    __metadata("design:paramtypes", [Object])
], CreateProblemUsecase);
//# sourceMappingURL=create-problem.usecase.js.map