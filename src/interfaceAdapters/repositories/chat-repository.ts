import { injectable } from 'tsyringe';
import {
  IChatRepository,
  IGetChatsOutputDto,
} from '../../domain/repositoryInterfaces/chat-repository.interface';
import { IChatEntity } from '../../domain/entities/chat-entity';
import { BaseRepository } from './base-repository';
import { ChatModel, IChatModel } from '../../frameworks/database/models/chat.model';
import { chatRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { Types } from 'mongoose';

@injectable()
export class ChatRepository
  extends BaseRepository<IChatModel, IChatEntity>
  implements IChatRepository
{
  constructor() {
    super(ChatModel, chatRepositoryMapper.toEntity, chatRepositoryMapper.toModel);
  }
    async markAllMessagesAsRead(receiverId: string, senderId: string): Promise<void> {
       await ChatModel.updateMany({
        senderId: senderId,
        receiverId: receiverId,
        seen: false
       },{
        $set:{
          seen:true
        }
       })
    }

  async getChats(currentUserId: string): Promise<IGetChatsOutputDto[]> {
    const userId = new Types.ObjectId(currentUserId);

    const conversations = await ChatModel.aggregate([
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
  async getChat(userId: string, receiverId: string): Promise<IChatEntity[]> {
    const chats = await ChatModel.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    })
      .sort({ createdAt: 1 })
     

    return chats.map(chatRepositoryMapper.toEntity);
  }
}
