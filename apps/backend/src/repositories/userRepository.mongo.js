/**
 * User repository – MongoDB implementation.
 * Uses Mongoose User model. For AWS migration, add userRepository.aws.js
 * and switch in repositories/index.js based on env.DB_ADAPTER.
 */
const User = require("../models/User");

async function createUser(data) {
  const user = new User(data);
  return user.save().then((u) => u.toObject());
}

async function findByEmailAndType(email, type) {
  const user = await User.findOne({ email: email.trim().toLowerCase(), type }).lean();
  return user || null;
}

async function findById(id) {
  const user = await User.findById(id).lean();
  return user || null;
}

module.exports = {
  createUser,
  findByEmailAndType,
  findById,
};