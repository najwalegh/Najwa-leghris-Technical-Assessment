// src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModule } from './shared/shared.module';
import { AppResolver } from './app.resolver';
import { PineconeModule } from './pinecone/models/pinecone.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    PineconeModule,
    SharedModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
