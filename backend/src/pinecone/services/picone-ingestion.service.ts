import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/libs/pinecone';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

@Injectable()
export class PineconeService {
  async runIngestion(): Promise<void> {
    const filePath = 'public/docs';

    try {
      console.log('Starting ingestion process...');
      const directoryLoader = new DirectoryLoader(filePath, {
        '.pdf': (path) => new PDFLoader(path),
      });

      const rawDocs = await directoryLoader.load();

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);

      const embeddings = new OpenAIEmbeddings();
      if (!process.env.PINECONE_INDEX_NAME) {
        throw new Error('Missing Pinecone index name in .env file');
      }
      const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

      await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        textKey: 'text',
      });
      console.log('Ingestion complete.');
    } catch (error) {
      console.error('Error during ingestion:', error);
      throw new Error('Failed to ingest data');
    }
  }
}
