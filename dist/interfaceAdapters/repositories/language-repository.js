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
exports.LanguageRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const language_model_1 = require("../../frameworks/database/models/language.model");
let LanguageRepository = class LanguageRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(language_model_1.LanguageModel, dto_mapper_1.langaugeRepositoryMapper.toEntity, dto_mapper_1.langaugeRepositoryMapper.toModel);
    }
    async getLanguageByProblemIdAndLanguage(id, langauge) {
        return await language_model_1.LanguageModel.findOne({ problemId: id, language: langauge });
    }
};
exports.LanguageRepository = LanguageRepository;
exports.LanguageRepository = LanguageRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], LanguageRepository);
//# sourceMappingURL=language-repository.js.map