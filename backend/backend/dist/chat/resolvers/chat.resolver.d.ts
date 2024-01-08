import { ChatService } from '../services/chat.service';
export declare class ChatResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    addMessage(userId: string, question: string): Promise<string>;
    getResponse(userId: string, question: string): Promise<string>;
}
