const express = require("express");
const { getProfile, updateProfile } = require("../controllers/expertProfileController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProfile);
router.patch("/", updateProfile);

module.exports = router;
