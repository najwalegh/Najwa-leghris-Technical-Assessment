import { Resolver, Query } from '@nestjs/graphql';
import { PineconeService } from '../services/picone-ingestion.service';

@Resolver()
export class PineconeResolver {
  constructor(private readonly pineconeService: PineconeService) {}

  @Query(() => String)
  async runIngestion(): Promise<string> {
    try {
      await this.pineconeService.runIngestion();
      return 'Ingestion complete';
    } catch (error) {
      console.error('Error during ingestion:', error);
      throw new Error('Failed to ingest data');
    }
  }
}
