import { PineconeService } from '../services/pinecone-ingestion.service';
export declare class PineconeResolver {
    private readonly pineconeService;
    constructor(pineconeService: PineconeService);
    runIngestion(): Promise<string>;
}
