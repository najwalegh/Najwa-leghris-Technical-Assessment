import { PineconeService } from '../services/picone-ingestion.service';
export declare class PineconeResolver {
    private readonly pineconeService;
    constructor(pineconeService: PineconeService);
    runIngestion(): Promise<string>;
}
