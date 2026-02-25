const path = require("path");
const dotenv = require("dotenv");

// Load .env from backend root (apps/backend/.env)
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "5000", 10),
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/voxvertex",
  /** Set to "aws" when migrating to DynamoDB/DocumentDB; use "mongodb" (default) for current setup */
  DB_ADAPTER: process.env.DB_ADAPTER || "mongodb",
  /** For frontend: API base URL (e.g. https://api.yourdomain.com). Backend does not use this. */
  API_BASE_URL: process.env.API_BASE_URL || "",
};

module.exports = { env };
