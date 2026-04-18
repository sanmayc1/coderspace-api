import { inject, injectable } from 'tsyringe';
import { IGetAllChatsUsecase } from '../../Interfaces/users/chat/get-all-chats.usecase';
import { IChatRepository } from '../../../domain/repositoryInterfaces/chat-repository.interface';
import { IGetAllChatsUsecaseOutputDto } from '../../dtos/user.dto';
import { getAllChatsUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllChatsUsecase implements IGetAllChatsUsecase {
  constructor(@inject('IChatRepository') private _chatRepository: IChatRepository) {}
  async execute(accountId: string): Promise<IGetAllChatsUsecaseOutputDto[]> {
    const chats = await this._chatRepository.getChats(accountId);

    return chats.map(getAllChatsUsecaseMapper.toResponse);
  }
}
