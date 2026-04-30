"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const tsyringe_1 = require("tsyringe");
const base_route_1 = require("../../base-route");
const di_resolver_1 = require("../../../../di/di-resolver");
const async_handler_1 = require("../../../../../shared/async-handler");
let ChatRoutes = class ChatRoutes extends base_route_1.BaseRoute {
    constructor() {
        super();
    }
    initializeRoutes() {
        this.router.get('/', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.chatController.getChats.bind(di_resolver_1.chatController)));
        this.router.get('/:id/messages', (0, async_handler_1.asyncHandler)(di_resolver_1.authMiddleware.handle(['user']).bind(di_resolver_1.authMiddleware)), (0, async_handler_1.asyncHandler)(di_resolver_1.chatController.getChat.bind(di_resolver_1.chatController)));
    }
};
exports.ChatRoutes = ChatRoutes;
exports.ChatRoutes = ChatRoutes = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ChatRoutes);
//# sourceMappingURL=chat.routes.js.map