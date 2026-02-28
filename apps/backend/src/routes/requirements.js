const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  ensureBusiness,
  createRequirement,
  listRequirements,
  getRequirement,
  updateRequirement,
} = require("../controllers/requirementsController");

const router = express.Router();

router.use(authMiddleware);
router.use(ensureBusiness);

router.post("/", createRequirement);
router.get("/", listRequirements);
router.get("/:id", getRequirement);
router.patch("/:id", updateRequirement);

module.exports = router;
