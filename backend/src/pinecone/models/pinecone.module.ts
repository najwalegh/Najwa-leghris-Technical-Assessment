import { Module } from '@nestjs/common';
import { PineconeResolver } from '../resolvers/picone.resolver';
import { PineconeService } from '../services/picone-ingestion.service';

@Module({
  providers: [PineconeResolver, PineconeService],
})
export class PineconeModule {}
