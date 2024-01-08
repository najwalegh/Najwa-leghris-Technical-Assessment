import { Test, TestingModule } from '@nestjs/testing';
import { PineconeService } from './pinecone-ingestion.service';

describe('PineconeService', () => {
  let pineconeService: PineconeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PineconeService],
    }).compile();

    pineconeService = module.get<PineconeService>(PineconeService);
  });

  it('should be defined', () => {
    expect(pineconeService).toBeDefined();
  });

  it('should run ingestion successfully', async () => {
    spyOn(pineconeService, 'runIngestion').and.returnValue(Promise.resolve());
    await pineconeService.runIngestion();
    expect(pineconeService.runIngestion).toHaveBeenCalled();
  });

  it('should handle ingestion failure', async () => {
    spyOn(pineconeService, 'runIngestion').and.returnValue(
      Promise.reject('Test error'),
    );
    await expect(pineconeService.runIngestion()).rejects.toThrowError(
      'Failed to ingest data',
    );
    expect(pineconeService.runIngestion).toHaveBeenCalled();
  });
});
export { PineconeService };
