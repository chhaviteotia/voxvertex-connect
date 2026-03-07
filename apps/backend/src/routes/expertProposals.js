const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { ensureExpert, createProposal } = require("../controllers/proposalsController");

const router = express.Router();

router.use(authMiddleware);
router.use(ensureExpert);

router.post("/", createProposal);

module.exports = router;
