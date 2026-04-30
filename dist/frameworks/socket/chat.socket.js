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
exports.SocketHandler = void 0;
const tsyringe_1 = require("tsyringe");
let SocketHandler = class SocketHandler {
    _chatRepository;
    _accountRepository;
    constructor(_chatRepository, _accountRepository) {
        this._chatRepository = _chatRepository;
        this._accountRepository = _accountRepository;
    }
    createRoomId(user1, user2) {
        return [user1, user2].sort().join('_');
    }
    registerChatSocketHandlers(io) {
        io.on('connection', (socket) => {
            const userId = socket.data.user?.accountId;
            if (!userId) {
                socket.disconnect();
                return;
            }
            socket.join(userId);
            socket.on('join_chat', (receiverId) => {
                const roomId = this.createRoomId(userId, receiverId);
                socket.join(roomId);
            });
            socket.on('mark_message_read', async (data) => {
                try {
                    await this._chatRepository.markAllMessagesAsRead(userId, data.senderId);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on('leave_chat', (receiverId) => {
                const roomId = this.createRoomId(userId, receiverId);
                socket.leave(roomId);
            });
            socket.on('send_message', async (data, callback) => {
                const roomId = this.createRoomId(userId, data.receiverId);
                try {
                    const chat = await this._chatRepository.create({
                        senderId: userId,
                        receiverId: data.receiverId,
                        content: data.message,
                    });
                    io.to(roomId).emit('receive_message', {
                        ...chat,
                        message: chat.content,
                        timestamp: chat.createdAt,
                    });
                    const sender = await this._accountRepository.findById(userId);
                    io.to(data.receiverId).emit('new_chat', {
                        chatPartner: {
                            id: sender?._id,
                            name: sender?.name,
                            profilePicture: sender?.profileUrl,
                        },
                        lastMessage: {
                            content: chat.content,
                            timestamp: chat.createdAt,
                        },
                        unreadCount: 1,
                    });
                    callback({
                        success: true,
                        message: {
                            ...chat,
                            message: chat.content,
                            timestamp: chat.createdAt,
                        },
                    });
                }
                catch (error) {
                    callback({ success: false });
                }
            });
        });
    }
};
exports.SocketHandler = SocketHandler;
exports.SocketHandler = SocketHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IChatRepository')),
    __param(1, (0, tsyringe_1.inject)('IAccountRepository')),
    __metadata("design:paramtypes", [Object, Object])
], SocketHandler);
//# sourceMappingURL=chat.socket.js.map