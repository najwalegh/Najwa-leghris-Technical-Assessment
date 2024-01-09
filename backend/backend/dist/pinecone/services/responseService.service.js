"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProcessingService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("langchain/embeddings/openai");
const openai_2 = require("langchain/chat_models/openai");
const chains_1 = require("langchain/chains");
const pinecone_1 = require("../../libs/pinecone");
const schema_1 = require("langchain/schema");
const pinecone_2 = require("langchain/vectorstores/pinecone");
let ChatProcessingService = class ChatProcessingService {
    async processQuestion(question, messages) {
        try {
            const chain = await this.initModelAndChain();
            const pastMessages = this.convertToModelFormat(messages);
            const response = await this.askQuestion(question, pastMessages, chain);
            console.log('Response:', response);
            return response.text;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to ask the question');
        }
    }
    async initModelAndChain() {
        if (!process.env.PINECONE_INDEX_NAME)
            throw Error('no index');
        const index = pinecone_1.pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const vectorStore = await pinecone_2.PineconeStore.fromExistingIndex(new openai_1.OpenAIEmbeddings({}), { pineconeIndex: index, textKey: 'text' });
        const model = new openai_2.ChatOpenAI({ modelName: 'gpt-3.5-turbo' });
        return chains_1.ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {});
    }
    convertToModelFormat(messages) {
        return messages.map((message, i) => {
            try {
                return i % 2 === 0
                    ? new schema_1.HumanMessage(message.content)
                    : new schema_1.AIMessage(message.content);
            }
            catch (error) {
                console.error(`Error creating message for content: ${message.content}`);
                console.error(error);
                return new schema_1.AIMessage('Error creating message');
            }
        });
    }
    async askQuestion(question, pastMessages, chain) {
        return chain.call({ question, chat_history: pastMessages });
    }
};
exports.ChatProcessingService = ChatProcessingService;
exports.ChatProcessingService = ChatProcessingService = __decorate([
    (0, common_1.Injectable)()
], ChatProcessingService);
//# sourceMappingURL=responseService.service.js.map