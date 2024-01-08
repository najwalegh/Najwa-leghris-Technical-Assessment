import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../shared/models';
import { ObjectType, Field } from '@nestjs/graphql'; 

@ObjectType()
@Schema()
export class ChatModel extends BaseModel {
  @Field()
  @Prop()
  userId: string;

  @Field()
  @Prop()
  question: string;

  @Field()
  @Prop()
  response: string;
}

export const ChatSchema = SchemaFactory.createForClass(ChatModel);
