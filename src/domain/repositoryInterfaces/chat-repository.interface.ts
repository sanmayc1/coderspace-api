import { IChatEntity } from '../entities/chat-entity';
import { IBaseRepository } from './base-repository.interface';

export interface IChatRepository extends IBaseRepository<IChatEntity> {
  getChats(currentUserId: string): Promise<IGetChatsOutputDto[] >;
  getChat(senderId: string, receiverId: string): Promise<IChatEntity[]>;
  markAllMessagesAsRead(receiverId: string, senderId: string): Promise<void>;
}

export interface IGetChatsOutputDto {
  lastMessage: string;
  lastMessageTime: Date;
  unseenCount: number;
  chatPartner: {
    _id: string;
    name: string;
    email: string;
    profileUrl: string;
  };
}
