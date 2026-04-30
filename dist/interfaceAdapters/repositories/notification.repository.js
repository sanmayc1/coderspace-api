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
exports.NotificationRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const notification_model_1 = require("../../frameworks/database/models/notification.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = require("mongoose");
let NotificationRepository = class NotificationRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(notification_model_1.NotificationModel, dto_mapper_1.notificationRepositoryMapper.toEntity, dto_mapper_1.notificationRepositoryMapper.toModel);
    }
    async getAllNotificationsOfUser(accountId, options) {
        const limit = options?.limit || 10;
        const skip = options?.skip || 0;
        const filter = { accountId: new mongoose_1.Types.ObjectId(accountId) };
        const [docs, total] = await Promise.all([
            notification_model_1.NotificationModel.find({ ...filter, isRead: false }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            notification_model_1.NotificationModel.countDocuments({ ...filter, isRead: false })
        ]);
        return {
            notifications: docs.map(doc => dto_mapper_1.notificationRepositoryMapper.toEntity(doc)),
            total
        };
    }
    async markAsRead(notificationId) {
        await notification_model_1.NotificationModel.updateOne({ _id: new mongoose_1.Types.ObjectId(notificationId) }, { isRead: true });
    }
    async markAllAsRead(accountId) {
        await notification_model_1.NotificationModel.updateMany({ accountId: new mongoose_1.Types.ObjectId(accountId) }, { isRead: true });
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], NotificationRepository);
//# sourceMappingURL=notification.repository.js.map