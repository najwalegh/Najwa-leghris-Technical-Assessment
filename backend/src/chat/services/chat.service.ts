import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ChatModel } from '../chat.model';
import { PineconeService } from '@/pinecone/services';
import { ChatProcessingService } from '@/pinecone/services/responseService.service';

@Injectable()
export class ChatService {
  private readonly pineconeIndexName: string;
  private messages: { content: string; isUser: boolean }[] = [];

  constructor(
    @InjectModel(ChatModel.name) private readonly chatModel: Model<ChatModel>,
    private readonly configService: ConfigService,
    private readonly chatProcessingService: ChatProcessingService, // private readonly pineconeService: PineconeService,
  ) {
    this.pineconeIndexName = this.configService.get<string>(
      'PINECONE_INDEX_NAME',
    );
  }

  async addMessageToStore(userId: string, question: string): Promise<string> {
    const response = await this.chatProcessingService.processQuestion(
      question,
      this.messages,
    );
    const newChat = new this.chatModel({ userId, question, response });
    await newChat.save();
    return response;
  }

  async getChatHistory(userId: string): Promise<ChatModel[]> {
    return this.chatModel.find({ userId }).exec();
  }
}
