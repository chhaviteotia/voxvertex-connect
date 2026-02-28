/**
 * Data access layer. Switch DB via env.DB_ADAPTER: "mongodb" | "aws"
 */
const { env } = require("../config/env");

const adapter = env.DB_ADAPTER === "aws" ? "aws" : "mongodb";
const userRepo = require(`./userRepository.${adapter}.js`);
const requirementRepo = require(`./requirementRepository.${adapter}.js`);

module.exports = {
  userRepository: userRepo,
  requirementRepository: requirementRepo,
};
