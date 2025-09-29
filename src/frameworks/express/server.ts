import express, { Application } from "express";
import cors from "cors";
import { Server as IServer, createServer } from "http";
import cookieParser from "cookie-parser";
import { config } from "../../shared/config.js";
import {
  adminRoutes,
  authRoutes,
  errorMiddleware,
  userRoutes,
} from "../di/di-resolver.js";
import { Socket, Server as SocketServer } from "socket.io";

export class Server {
  private _app: Application;
  private _server: IServer;
  private _io: SocketServer;

  constructor() {
    this._app = express();
    this._server = createServer(this._app);
    this._io = new SocketServer(this._server, {
      cors: { origin: config.client.uri, credentials: true },
    });
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
    this._app.use(cors({ origin: config.client.uri, credentials: true }))
    this._app.use("/api/v1/auth", authRoutes.router);
    this._app.use("/api/v1/admin", adminRoutes.router);
    this._app.use("/api/v1/user", userRoutes.router);
    this._io.on("connection",async (socket:Socket) => {
       
      const accessToken = socket.handshake.headers.cookie?.split(";")[0].split('=')[1]
      
      // console.log("auth",accessToken)
    });
  }

  private configureErrorHandling() {
    this._app.use(errorMiddleware.handleError.bind(errorMiddleware));
  }

  public start(): void {
    this._server.listen(config.server.port, () => {
      console.log(
        `Server running on http://${config.server.host}:${config.server.port}`
      );
    });
  }
}
