import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Module-scoped cache
let cachedConnection: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}

export default dbConnect;
