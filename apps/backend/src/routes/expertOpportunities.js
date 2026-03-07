const express = require("express");
const { getOpportunities } = require("../controllers/expertOpportunitiesController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getOpportunities);

module.exports = router;
