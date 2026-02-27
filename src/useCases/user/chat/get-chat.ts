import { inject, injectable } from 'tsyringe';
import { IGetChatUsecase } from '../../Interfaces/users/chat/get-chat.usecase';
import { IChatRepository } from '../../../domain/repositoryInterfaces/chat-repository.interface';
import { IGetChatUsecaseOutputDto } from '../../dtos/user.dto';
import { getAllChatsUsecaseMapper, getChatMessageMapper } from '../../dtos/mappers/mappers';
import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';

@injectable()
export class GetChatsUsecase implements IGetChatUsecase {
  constructor(
    @inject('IChatRepository') private _chatRepository: IChatRepository,
    @inject('IAccountRepository') private _accountsRepository: IAccountsRepository
  ) {}
  async execute(accountId: string, receiverId: string): Promise<IGetChatUsecaseOutputDto> {
    const chats = await this._chatRepository.getChat(accountId, receiverId);
    const chatPartner = await this._accountsRepository.findById(receiverId);
    const mappedChats = chats.map(getChatMessageMapper.toResponse);

    return {
        chatPartner:{
            id:chatPartner?._id as string,
            name:chatPartner?.name as string,
            profilePicture:chatPartner?.profileUrl as string
        },
        chats:mappedChats
    }
  }
}
