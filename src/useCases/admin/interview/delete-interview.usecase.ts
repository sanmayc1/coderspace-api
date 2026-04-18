import { inject, injectable } from 'tsyringe';
import { IDeleteInterviewUsecase } from '../../Interfaces/admin/interview-management/delete-interview.usecase.interface';
import { InterviewRepository } from '../../../interfaceAdapters/repositories/interview-repository';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';

@injectable()
export class DeleteInterviewUsecase implements IDeleteInterviewUsecase {
  constructor(
    @inject('IInterviewRepository')
    private _interviewRepository: InterviewRepository
  ) {}
  async execute(id: string): Promise<void> {
    const interview = await this._interviewRepository.findById(id);
    if (!interview) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.INTERVIEW_NOT_FOUND);
    }
    await this._interviewRepository.deleteById(id);
  }
}
