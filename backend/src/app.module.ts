import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModule } from './shared/shared.module';
import { AppResolver } from './app.resolver';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [SharedModule, ChatModule],
  providers: [AppResolver],
})
export class AppModule {}
