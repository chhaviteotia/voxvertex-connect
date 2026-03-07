/**
 * Proposal repository – AWS stub.
 */
async function create(data) {
  throw new Error("Proposal repository: AWS adapter not implemented.");
}

async function listByRequirementId(requirementId, options = {}) {
  return [];
}

async function findById(id) {
  return null;
}

async function countByRequirementId(requirementId, status) {
  return 0;
}

module.exports = {
  create,
  listByRequirementId,
  findById,
  countByRequirementId,
};
