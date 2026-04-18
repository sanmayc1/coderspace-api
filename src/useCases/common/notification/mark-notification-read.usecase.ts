import { inject, injectable } from 'tsyringe';
import { IMarkNotificationReadUsecase } from '../../Interfaces/common/notification/mark-notification-read.usecase.interface';
import { INotificationRepository } from '../../../domain/repositoryInterfaces/notification-repository.interface';
import { HTTP_STATUS, ERROR_MESSAGES } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';

@injectable()
export class MarkNotificationReadUsecase implements IMarkNotificationReadUsecase {
  constructor(
    @inject('INotificationRepository') private _notificationRepository: INotificationRepository
  ) {}

  async execute(accountId: string): Promise<void> {
    await this._notificationRepository.markAllAsRead(accountId);
  }
}
