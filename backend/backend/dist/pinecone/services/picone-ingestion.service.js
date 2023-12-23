"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PineconeService = void 0;
const common_1 = require("@nestjs/common");
const text_splitter_1 = require("langchain/text_splitter");
const openai_1 = require("langchain/embeddings/openai");
const pinecone_1 = require("langchain/vectorstores/pinecone");
const pinecone_2 = require("../../libs/pinecone");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const directory_1 = require("langchain/document_loaders/fs/directory");
let PineconeService = class PineconeService {
    async runIngestion() {
        const filePath = 'public/docs';
        try {
            console.log('Starting ingestion process...');
            const directoryLoader = new directory_1.DirectoryLoader(filePath, {
                '.pdf': (path) => new pdf_1.PDFLoader(path),
            });
            const rawDocs = await directoryLoader.load();
            const textSplitter = new text_splitter_1.RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const docs = await textSplitter.splitDocuments(rawDocs);
            const embeddings = new openai_1.OpenAIEmbeddings();
            if (!process.env.PINECONE_INDEX_NAME) {
                throw new Error('Missing Pinecone index name in .env file');
            }
            const index = pinecone_2.pinecone.Index(process.env.PINECONE_INDEX_NAME);
            await pinecone_1.PineconeStore.fromDocuments(docs, embeddings, {
                pineconeIndex: index,
                textKey: 'text',
            });
            console.log('Ingestion complete.');
        }
        catch (error) {
            console.error('Error during ingestion:', error);
            throw new Error('Failed to ingest data');
        }
    }
};
exports.PineconeService = PineconeService;
exports.PineconeService = PineconeService = __decorate([
    (0, common_1.Injectable)()
], PineconeService);
//# sourceMappingURL=picone-ingestion.service.js.map