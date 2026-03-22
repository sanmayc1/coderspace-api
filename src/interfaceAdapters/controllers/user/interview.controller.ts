import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ITtsAndSttService } from '../../../domain/services/tts-and-stt-service.interface';

@injectable()
export class InterviewController {
  constructor(@inject('ITtsAndSttService') private _ttsAndSttService: ITtsAndSttService) {}

  async test(req: Request, res: Response) {

  }

  async startInterview(req: Request, res: Response) {
    
  }
}
