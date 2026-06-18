import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB ?? "startup_logs";

declare global {
  var _mongoClient: MongoClient | undefined;
}

async function connect(): Promise<MongoClient> {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  return client;
}

export async function getDb(): Promise<Db> {
  if (global._mongoClient) {
    try {
      await global._mongoClient.db("admin").command({ ping: 1 });
      return global._mongoClient.db(dbName);
    } catch {
      await global._mongoClient.close().catch(() => {});
      global._mongoClient = undefined;
    }
  }

  global._mongoClient = await connect();
  return global._mongoClient.db(dbName);
}
