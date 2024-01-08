import { Pinecone } from '@pinecone-database/pinecone';

// Check if Pinecone environment and API key variables are set
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or API key variables are missing');
}

// Function to initialize Pinecone client
function initPinecone() {
  try {
    // Create a new instance of the Pinecone class
    const pinecone = new Pinecone({
      environment: process.env.PINECONE_ENVIRONMENT ?? '', // Environment specified in the dashboard.
      apiKey: process.env.PINECONE_API_KEY ?? '', // API key for authentication.
    });

    // Return the Pinecone client
    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export const pinecone = initPinecone();
