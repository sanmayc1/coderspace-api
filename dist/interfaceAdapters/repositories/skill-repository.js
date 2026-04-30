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
exports.SkillRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const skill_model_1 = require("../../frameworks/database/models/skill.model");
let SkillRepository = class SkillRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(skill_model_1.SkillModel, dto_mapper_1.skillRepositoryMapper.toEntity, dto_mapper_1.skillRepositoryMapper.toModel);
    }
    async getAll() {
        return await skill_model_1.SkillModel.find();
    }
    async findByTitle(title) {
        return await skill_model_1.SkillModel.findOne({ title });
    }
};
exports.SkillRepository = SkillRepository;
exports.SkillRepository = SkillRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], SkillRepository);
//# sourceMappingURL=skill-repository.js.map