const express = require("express");
const {
  getSettings,
  updateOrganization,
  updateProfile,
  updateNotifications,
  changePassword,
  uploadAvatar,
} = require("../controllers/businessSettingsController");
const { authMiddleware } = require("../middleware/auth");
const uploadAvatarMiddleware = require("../middleware/uploadAvatar");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getSettings);
router.patch("/organization", updateOrganization);
router.patch("/profile", updateProfile);
router.patch("/notifications", updateNotifications);
router.post("/change-password", changePassword);
router.post("/avatar", uploadAvatarMiddleware, uploadAvatar);

module.exports = router;

