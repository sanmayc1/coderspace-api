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
exports.GetChatsUsecase = void 0;
const tsyringe_1 = require("tsyringe");
const mappers_1 = require("../../dtos/mappers/mappers");
let GetChatsUsecase = class GetChatsUsecase {
    _chatRepository;
    _accountsRepository;
    constructor(_chatRepository, _accountsRepository) {
        this._chatRepository = _chatRepository;
        this._accountsRepository = _accountsRepository;
    }
    async execute(accountId, receiverId) {
        const chats = await this._chatRepository.getChat(accountId, receiverId);
        const chatPartner = await this._accountsRepository.findById(receiverId);
        const mappedChats = chats.map(mappers_1.getChatMessageMapper.toResponse);
        return {
            chatPartner: {
                id: chatPartner?._id,
                name: chatPartner?.name,
                profilePicture: chatPartner?.profileUrl
            },
            chats: mappedChats
        };
    }
};
exports.GetChatsUsecase = GetChatsUsecase;
exports.GetChatsUsecase = GetChatsUsecase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IChatRepository')),
    __param(1, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object])
], GetChatsUsecase);
//# sourceMappingURL=get-chat.js.map