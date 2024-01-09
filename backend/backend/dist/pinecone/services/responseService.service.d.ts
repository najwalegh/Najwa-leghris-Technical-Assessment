import { MessageDTO } from '@/shared/dto/message.dto';
export declare class ChatProcessingService {
    processQuestion(question: string, messages: MessageDTO[]): Promise<string>;
    private initModelAndChain;
    private convertToModelFormat;
    private askQuestion;
}
