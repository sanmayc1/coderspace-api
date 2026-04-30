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
exports.InterviewSessionRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const interview_session_1 = require("../../frameworks/database/models/interview-session");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
let InterviewSessionRepository = class InterviewSessionRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(interview_session_1.InterviewSessionModel, dto_mapper_1.interviewSessionRepositoryMapper.toEntity, dto_mapper_1.interviewSessionRepositoryMapper.toModel);
    }
    async checkSessionExist(interviewId, accountId) {
        const session = await interview_session_1.InterviewSessionModel.findOne({ interviewId, accountId });
        return !!session;
    }
    async findByInterviewIdAndAccountId(interviewId, accountId) {
        const session = await interview_session_1.InterviewSessionModel.findOne({ interviewId, accountId });
        return session ? dto_mapper_1.interviewSessionRepositoryMapper.toEntity(session) : null;
    }
};
exports.InterviewSessionRepository = InterviewSessionRepository;
exports.InterviewSessionRepository = InterviewSessionRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], InterviewSessionRepository);
//# sourceMappingURL=interview-session-repository.js.map