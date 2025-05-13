import { CosmosClient } from '../node_modules/@azure/cosmos';

const connectionString = process.env.COSMOSDB_CONNECTION_STRING;
const databaseName = process.env.COSMOSDB_DATABASE_NAME;
const containerName = process.env.COSMOSDB_CONTAINER_NAME;

if (!connectionString || !databaseName || !containerName) {
  throw new Error('Missing Cosmos DB environment variables');
}

const client = new CosmosClient(connectionString);
const database = client.database(databaseName);
const container = database.container(containerName);

export { client, database, container };
