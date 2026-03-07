const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    requirementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
      required: true,
      index: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "submitted"],
      default: "submitted",
      index: true,
    },
    /** Payload from Submit Proposal form: understanding, outcomePlan, measurableOutcomes, sessionStructure, deliverables, similarEngagements, industryMatch, proposedFee, feeBreakdown, etc. */
    formData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

proposalSchema.index({ requirementId: 1, createdAt: -1 });
proposalSchema.index({ submittedBy: 1, createdAt: -1 });

module.exports = mongoose.model("Proposal", proposalSchema);
