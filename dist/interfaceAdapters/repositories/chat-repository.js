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
exports.ChatRepository = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("./base-repository");
const chat_model_1 = require("../../frameworks/database/models/chat.model");
const dto_mapper_1 = require("../../frameworks/database/dtoMappers/dto.mapper");
const mongoose_1 = require("mongoose");
let ChatRepository = class ChatRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(chat_model_1.ChatModel, dto_mapper_1.chatRepositoryMapper.toEntity, dto_mapper_1.chatRepositoryMapper.toModel);
    }
    async markAllMessagesAsRead(receiverId, senderId) {
        await chat_model_1.ChatModel.updateMany({
            senderId: senderId,
            receiverId: receiverId,
            seen: false
        }, {
            $set: {
                seen: true
            }
        });
    }
    async getChats(currentUserId) {
        const userId = new mongoose_1.Types.ObjectId(currentUserId);
        const conversations = await chat_model_1.ChatModel.aggregate([
            {
                $match: {
                    $or: [{ senderId: userId }, { receiverId: userId }],
                },
            },
            {
                $addFields: {
                    chatPartner: {
                        $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'],
                    },
                },
            },
            { $sort: { createdAt: -1 } },
            {
                $group: {
                    _id: '$chatPartner',
                    lastMessage: { $first: '$content' },
                    lastMessageTime: { $first: '$createdAt' },
                    unseenCount: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [{ $eq: ['$receiverId', userId] }, { $eq: ['$seen', false] }],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'accounts', // collection name in MongoDB
                    localField: '_id',
                    foreignField: '_id',
                    as: 'chatPartner',
                },
            },
            // Convert array to object
            {
                $unwind: '$chatPartner',
            },
            // Optional: format output
            {
                $project: {
                    _id: 0,
                    chatPartner: {
                        _id: '$chatPartner._id',
                        name: '$chatPartner.name',
                        email: '$chatPartner.email',
                        profileUrl: '$chatPartner.profileUrl',
                    },
                    lastMessage: 1,
                    lastMessageTime: 1,
                    unseenCount: 1,
                },
            },
        ]);
        return conversations;
    }
    async getChat(userId, receiverId) {
        const chats = await chat_model_1.ChatModel.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId },
            ],
        })
            .sort({ createdAt: 1 });
        return chats.map(dto_mapper_1.chatRepositoryMapper.toEntity);
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ChatRepository);
//# sourceMappingURL=chat-repository.js.map