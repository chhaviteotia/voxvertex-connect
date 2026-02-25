/**
 * Data access layer. Switch implementation via env.DB_ADAPTER.
 * - "mongodb" (default): uses Mongoose/Atlas
 * - "aws": use userRepository.aws.js when migrating to DynamoDB/DocumentDB
 */
const { env } = require("../config/env");

const adapter = env.DB_ADAPTER === "aws" ? "aws" : "mongodb";
let userRepo;
try {
  userRepo = require(`./userRepository.${adapter}.js`);
} catch (e) {
  if (adapter === "aws") {
    throw new Error("DB_ADAPTER=aws but userRepository.aws.js not found. Add it when migrating to AWS.");
  }
  throw e;
}

module.exports = {
  userRepository: userRepo,
};