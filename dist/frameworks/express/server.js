"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("../../shared/config");
const di_resolver_1 = require("../di/di-resolver");
const socket_io_1 = require("socket.io");
class Server {
    _app;
    _server;
    _io;
    constructor() {
        this._app = (0, express_1.default)();
        this._server = (0, http_1.createServer)(this._app);
        this._io = new socket_io_1.Server(this._server, {
            cors: { origin: config_1.config.client.uri, credentials: true },
        });
        di_resolver_1.authMiddleware.socketAuthMiddleware(this._io);
        di_resolver_1.socketHandler.registerChatSocketHandlers(this._io);
        this.configureMiddleware();
        this.configureRouter();
        this.configureErrorHandling();
    }
    configureMiddleware() {
        const corsOptions = {
            origin: config_1.config.client.uri,
            credentials: true,
        };
        this._app.options('/*', (0, cors_1.default)({
            origin: config_1.config.client.uri,
            credentials: true,
        }));
        this._app.use((0, cors_1.default)(corsOptions));
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._app.use((0, cookie_parser_1.default)(config_1.config.cookieSecret));
    }
    configureRouter() {
        this._app.use('/api/v1/auth', di_resolver_1.authRoutes.router);
        this._app.use('/api/v1/admin', di_resolver_1.adminRoutes.router);
        this._app.use('/api/v1/user', di_resolver_1.userRoutes.router);
        this._app.use('/api/v1/company', di_resolver_1.companyRoutes.router);
        this._app.use('/api/v1/common', di_resolver_1.commonRoutes.router);
    }
    configureErrorHandling() {
        this._app.use(di_resolver_1.errorMiddleware.handleError.bind(di_resolver_1.errorMiddleware));
    }
    start() {
        this._server.listen(config_1.config.server.port, () => {
            console.log(`Server running on http://${config_1.config.server.host}:${config_1.config.server.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map