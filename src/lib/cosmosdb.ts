import { CosmosClient } from '@azure/cosmos';

// Retrieve environment variables
const connectionString = process.env.COSMOSDB_CONNECTION_STRING;
const databaseName = process.env.COSMOSDB_DATABASE_NAME;
const containerName = process.env.COSMOSDB_CONTAINER_NAME;

// Validate environment variables
if (!connectionString || !databaseName || !containerName) {
  throw new Error('Missing Cosmos DB environment variables');
}

// Initialize the CosmosClient
const client = new CosmosClient({ endpoint: connectionString, key: process.env.COSMOSDB_KEY });

// Access the database and container
const database = client.database(databaseName);
const container = database.container(containerName);

// Export the client, database, and container for use in other parts of the application
export { client, database, container };
