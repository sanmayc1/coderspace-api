import { Server, Socket } from 'socket.io';
import { inject, injectable } from 'tsyringe';
import { IChatRepository } from '../../domain/repositoryInterfaces/chat-repository.interface';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';

@injectable()
export class SocketHandler {
  constructor(
    @inject('IChatRepository') private _chatRepository: IChatRepository,
    @inject('IAccountRepository') private _accountRepository: IAccountsRepository
  ) {}

  createRoomId(user1: string, user2: string) {
    return [user1, user2].sort().join('_');
  }

  registerChatSocketHandlers(io: Server) {
    io.on('connection', (socket: Socket) => {
      const userId = socket.data.user?.accountId;

      if (!userId) {
        socket.disconnect();
        return;
      }

      socket.join(userId);

      socket.on('join_chat', (receiverId: string) => {
        const roomId = this.createRoomId(userId, receiverId);
        socket.join(roomId);
      });

      socket.on('mark_message_read', async (data) => {
        try {
          await this._chatRepository.markAllMessagesAsRead(userId, data.senderId);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on('leave_chat', (receiverId: string) => {
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
              id: sender?._id as string,
              name: sender?.name as string,
              profilePicture: sender?.profileUrl as string,
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
        } catch (error) {
          callback({ success: false });
        }
      });
    });
  }
}
