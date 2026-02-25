const mongoose = require("mongoose");
const { env } = require("./env");

const rawUri = env.MONGO_URI;
if (!process.env.MONGO_URI) {
  console.warn("MONGO_URI not set in .env; using default localhost. For Atlas, set MONGO_URI in apps/backend/.env");
}

/**
 * Convert mongodb+srv:// URI to standard mongodb:// URI (avoids DNS SRV lookup).
 * Use this from the start so we never hit "querySrv ECONNREFUSED" on restricted networks.
 */
function srvUriToStandardUri(srvUri) {
  const match = srvUri.match(/^mongodb\+srv:\/\/([^/]+)\/([^?]*)(\?.*)?$/);
  if (!match) return null;
  const [, userPart, dbName, qs = ""] = match;
  const params = new URLSearchParams(qs.replace(/^\?/, ""));
  params.set("ssl", "true");
  if (!params.has("authSource")) params.set("authSource", "admin");
  const db = (dbName && dbName.trim()) || "voxvertex";
  return `mongodb://${userPart}:27017/${db}?${params.toString()}`;
}

// If .env has mongodb+srv://, use standard format immediately so SRV lookup is never attempted
const mongoUri =
  rawUri.startsWith("mongodb+srv://") && srvUriToStandardUri(rawUri)
    ? srvUriToStandardUri(rawUri)
    : rawUri;

function isConnected() {
  return mongoose.connection.readyState === 1;
}

let retryCount = 0;

function connectDB(uri = mongoUri) {
  return mongoose.connect(uri).then(
    () => {
      console.log("Connected to MongoDB");
      retryCount = 0;
    },
    (error) => {
      retryCount += 1;
      if (retryCount === 1 || retryCount % 6 === 0) {
        console.error("MongoDB connection error:", error.message);
      }
      setTimeout(() => connectDB(uri), 30000);
    }
  );
}

module.exports = { connectDB, isConnected };
