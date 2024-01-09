import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { ChatService } from './chat/services';
import { ChatModel } from './chat/chat.model';

@Resolver()
export class AppResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => String)
  async addMessage(
    @Args('userId') userId: string,
    @Args('question') question: string,
  ): Promise<string> {
    console.log('backend:');
    const response = await this.chatService.addMessageToStore(userId, question);
    return response;
  }

  @Query(() => [ChatModel])
  async getChatHistory(@Args('userId') userId: string): Promise<ChatModel[]> {
    console.log('history:');
    const chatHistory = await this.chatService.getChatHistory(userId);
    return chatHistory;
  }
}
