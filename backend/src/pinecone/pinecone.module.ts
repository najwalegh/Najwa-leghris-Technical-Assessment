import { Module } from '@nestjs/common';
import { PineconeService } from './services/pinecone-ingestion.service';
import { ChatProcessingService } from './services/responseService.service';

@Module({
  providers: [PineconeService, ChatProcessingService],
  exports: [PineconeService, ChatProcessingService],
})
export class PineconeModule {}
