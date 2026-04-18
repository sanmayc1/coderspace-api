import { NextFunction, Request, Response } from 'express';
import { TRole } from '../../../shared/constant';
import { Server } from 'socket.io';

export interface IAuthMiddleware {
  handle(role: TRole[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
  socketAuthMiddleware(io:Server):void
}
