const { USER_TYPES } = require("../config/constants");
const { proposalRepository, requirementRepository } = require("../repositories");

function ensureExpert(req, res, next) {
  if (req.user?.type !== USER_TYPES.EXPERT) {
    return res.status(403).json({ success: false, error: "Expert account required." });
  }
  next();
}

function ensureBusiness(req, res, next) {
  if (req.user?.type !== USER_TYPES.BUSINESS) {
    return res.status(403).json({ success: false, error: "Business account required." });
  }
  next();
}

/**
 * POST /api/expert/proposals
 * Body: { requirementId: string, status?: 'draft'|'submitted', formData: object }
 * Expert submits a proposal for an opportunity (published requirement).
 */
async function createProposal(req, res) {
  try {
    const userId = req.user.userId;
    const { requirementId, status = "submitted", formData = {} } = req.body;

    if (!userId || !requirementId) {
      return res.status(400).json({ success: false, error: "requirementId is required." });
    }

    const requirement = await requirementRepository.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ success: false, error: "Opportunity not found." });
    }
    if (requirement.status !== "published") {
      return res.status(400).json({ success: false, error: "Can only submit proposals to published opportunities." });
    }

    const validStatus = status === "draft" || status === "submitted" ? status : "submitted";
    const proposal = await proposalRepository.create({
      requirementId,
      submittedBy: userId,
      status: validStatus,
      formData: formData && typeof formData === "object" ? formData : {},
    });

    return res.status(201).json({
      success: true,
      proposal: {
        id: proposal._id != null ? proposal._id.toString() : proposal._id,
        requirementId: proposal.requirementId != null ? proposal.requirementId.toString() : proposal.requirementId,
        status: proposal.status,
        formData: proposal.formData,
        createdAt: proposal.createdAt,
      },
    });
  } catch (err) {
    console.error("createProposal:", err);
    return res.status(500).json({ success: false, error: "Failed to submit proposal." });
  }
}

/**
 * GET /api/business/requirements/:requirementId/proposals
 * Returns proposals for a requirement (caller must own the requirement).
 */
async function listProposalsForRequirement(req, res) {
  try {
    const userId = req.user.userId;
    const { requirementId } = req.params;

    const requirement = await requirementRepository.findById(requirementId);
    if (!requirement) {
      return res.status(404).json({ success: false, error: "Requirement not found." });
    }
    if (String(requirement.createdBy) !== String(userId)) {
      return res.status(403).json({ success: false, error: "Not allowed to view proposals for this requirement." });
    }

    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const skip = Math.max(0, parseInt(req.query.skip, 10) || 0);
    const status = req.query.status || undefined;

    const [list, total] = await Promise.all([
      proposalRepository.listByRequirementId(requirementId, { limit, skip, status }),
      proposalRepository.countByRequirementId(requirementId, status),
    ]);

    return res.json({
      success: true,
      proposals: list.map((p) => {
        const expert = p.submittedBy || {};
        const name = expert.name || [expert.firstName, expert.lastName].filter(Boolean).join(" ") || expert.email || "Expert";
        const initials = name
          .split(/\s+/)
          .map((s) => s[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "EX";
        return {
          id: p._id != null ? p._id.toString() : p._id,
          requirementId: p.requirementId != null ? p.requirementId.toString() : p.requirementId,
          status: p.status,
          formData: p.formData,
          createdAt: p.createdAt,
          expert: {
            id: expert._id != null ? expert._id.toString() : expert._id,
            name,
            initials,
            email: expert.email,
          },
        };
      }),
      total,
    });
  } catch (err) {
    console.error("listProposalsForRequirement:", err);
    return res.status(500).json({ success: false, error: "Failed to load proposals." });
  }
}

module.exports = {
  ensureExpert,
  ensureBusiness,
  createProposal,
  listProposalsForRequirement,
};
