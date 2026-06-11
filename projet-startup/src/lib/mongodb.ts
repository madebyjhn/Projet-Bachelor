import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB ?? "startup_logs";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

async function connect(): Promise<MongoClient> {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  return client;
}

export async function getDb(): Promise<Db> {
  // Si un client existe, vérifie qu'il est toujours vivant avec un ping
  if (global._mongoClient) {
    try {
      await global._mongoClient.db("admin").command({ ping: 1 });
      return global._mongoClient.db(dbName);
    } catch {
      // Connexion morte (MongoTopologyClosedError, timeout, etc.) — on recrée
      await global._mongoClient.close().catch(() => {});
      global._mongoClient = undefined;
    }
  }

  global._mongoClient = await connect();
  return global._mongoClient.db(dbName);
}
