import express, { Application } from 'express';
import cors from 'cors';
import { Server as IServer, createServer } from 'http';
import cookieParser from 'cookie-parser';
import { config } from '../../shared/config';
import {
  adminRoutes,
  authMiddleware,
  authRoutes,
  commonRoutes,
  companyRoutes,
  errorMiddleware,
  socketHandler,
  userRoutes,
} from '../di/di-resolver';
import { Server as SocketServer } from 'socket.io';

export class Server {
  private _app: Application;
  private _server: IServer;
  private _io: SocketServer;

  constructor() {
    this._app = express();
    this._server = createServer(this._app);
    this._io = new SocketServer(this._server, {
      cors: { origin: [config.client.uri, config.client.uri2], credentials: true },
    });
    authMiddleware.socketAuthMiddleware(this._io);
    socketHandler.registerChatSocketHandlers(this._io);
    this.configureMiddleware();
    this.configureRouter();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cookieParser(config.cookieSecret));
  }

  private configureRouter(): void {
    const corsOptions = {
      origin: 'https://www.coderspaces.xyz',
      credentials: true,
    };
    this._app.use(cors(corsOptions));
    this._app.use('/api/v1/auth', authRoutes.router);
    this._app.use('/api/v1/admin', adminRoutes.router);
    this._app.use('/api/v1/user', userRoutes.router);
    this._app.use('/api/v1/company', companyRoutes.router);
    this._app.use('/api/v1/common', commonRoutes.router);
  }

  private configureErrorHandling() {
    this._app.use(errorMiddleware.handleError.bind(errorMiddleware));
  }

  public start(): void {
    this._server.listen(config.server.port, () => {
      console.log(`Server running on http://${config.server.host}:${config.server.port}`);
    });
  }
}
