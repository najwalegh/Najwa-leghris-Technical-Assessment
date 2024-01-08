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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const chat_model_1 = require("../chat.model");
const service2_service_1 = require("../../pinecone/services/service2.service");
let ChatService = class ChatService {
    constructor(chatModel, configService, chatProcessingService) {
        this.chatModel = chatModel;
        this.configService = configService;
        this.chatProcessingService = chatProcessingService;
        this.messages = [];
        this.pineconeIndexName = this.configService.get('PINECONE_INDEX_NAME');
    }
    async addMessageToStore(userId, question) {
        const response = await this.chatProcessingService.processQuestion(question, this.messages);
        const newChat = new this.chatModel({ userId, question, response });
        await newChat.save();
        return response;
    }
    async getChatHistory(userId) {
        return this.chatModel.find({ userId }).exec();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_model_1.ChatModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        service2_service_1.ChatProcessingService])
], ChatService);
//# sourceMappingURL=chat.service.js.map