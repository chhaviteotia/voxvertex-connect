const { requirementRepository } = require("../repositories");
const { USER_TYPES } = require("../config/constants");

function ensureExpert(req, res) {
  if (!req.user || req.user.type !== USER_TYPES.EXPERT) {
    res.status(403).json({
      success: false,
      error: "Only expert accounts can access opportunities.",
    });
    return false;
  }
  return true;
}

/**
 * GET /api/expert/opportunities
 * Returns published requirements (opportunities) for experts.
 */
async function getOpportunities(req, res) {
  try {
    if (!ensureExpert(req, res)) return;
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const skip = parseInt(req.query.skip, 10) || 0;
    const list = await requirementRepository.listPublished({ limit, skip });
    const opportunities = list.map((doc) => {
      const createdBy = doc.createdBy || {};
      return {
        id: doc._id.toString(),
        createdAt: doc.createdAt,
        companyName: createdBy.companyName || "Company",
        formData: doc.formData || {},
      };
    });
    return res.json({ success: true, data: opportunities });
  } catch (err) {
    console.error("[expertOpportunities.getOpportunities]", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to load opportunities." });
  }
}

module.exports = { getOpportunities };
