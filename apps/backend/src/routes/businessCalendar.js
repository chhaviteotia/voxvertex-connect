const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  scheduleRequirementSession,
  listScheduledSessions,
} = require("../controllers/businessCalendarController");

const router = express.Router();

router.use(authMiddleware);
router.get("/sessions", listScheduledSessions);
router.post("/sessions", scheduleRequirementSession);

module.exports = router;
