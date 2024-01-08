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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const services_1 = require("./chat/services");
const chat_model_1 = require("./chat/chat.model");
let AppResolver = class AppResolver {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async addMessage(userId, question) {
        const response = await this.chatService.addMessageToStore(userId, question);
        return response;
    }
    async getChatHistory(userId) {
        const chatHistory = await this.chatService.getChatHistory(userId);
        return chatHistory;
    }
};
exports.AppResolver = AppResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('question')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "addMessage", null);
__decorate([
    (0, graphql_1.Query)(() => [chat_model_1.ChatModel]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppResolver.prototype, "getChatHistory", null);
exports.AppResolver = AppResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [services_1.ChatService])
], AppResolver);
//# sourceMappingURL=app.resolver.js.map