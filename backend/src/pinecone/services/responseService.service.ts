import { Injectable } from '@nestjs/common';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { pinecone } from '@/libs/pinecone';
import { AIMessage, HumanMessage } from 'langchain/schema';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { MessageDTO } from '@/shared/dto/message.dto';

@Injectable()
export class ChatProcessingService {
  async processQuestion(
    question: string,
    messages: MessageDTO[],
  ): Promise<string> {
    try {
      const chain = await this.initModelAndChain();
      const pastMessages = this.convertToModelFormat(messages);
      const response = await this.askQuestion(question, pastMessages, chain);

      console.log('Response:', response);
      return response.text;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to ask the question');
    }
  }

  private async initModelAndChain(): Promise<ConversationalRetrievalQAChain> {
    if (!process.env.PINECONE_INDEX_NAME) throw Error('no index');
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      { pineconeIndex: index, textKey: 'text' },
    );

    const model = new ChatOpenAI({ modelName: 'gpt-3.5-turbo' });

    return ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {},
    );
  }

  private convertToModelFormat(
    messages: { content: string; isUser: boolean }[],
  ): (AIMessage | HumanMessage)[] {
    return messages.map((message, i) => {
      try {
        return i % 2 === 0
          ? new HumanMessage(message.content)
          : new AIMessage(message.content);
      } catch (error) {
        console.error(`Error creating message for content: ${message.content}`);
        console.error(error);
        return new AIMessage('Error creating message');
      }
    });
  }

  private async askQuestion(
    question: string,
    pastMessages: (AIMessage | HumanMessage)[],
    chain: ConversationalRetrievalQAChain,
  ): Promise<any> {
    return chain.call({ question, chat_history: pastMessages });
  }
}
