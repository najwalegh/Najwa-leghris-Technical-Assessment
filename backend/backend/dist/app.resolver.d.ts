import { ChatService } from './chat/services';
import { ChatModel } from './chat/chat.model';
export declare class AppResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    addMessage(userId: string, question: string): Promise<string>;
    getChatHistory(userId: string): Promise<ChatModel[]>;
}
