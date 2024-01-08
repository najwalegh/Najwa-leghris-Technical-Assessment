import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './services/chat.service';
import { ChatModel, ChatSchema } from './chat.model';
import { PineconeModule } from '@/pinecone/pinecone.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatModel.name, schema: ChatSchema }]),
    ConfigModule,
    PineconeModule,
  ],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
