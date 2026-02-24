const express = require("express");
const router = express.Router();
const controller = require("../controllers/settings.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/profile", authMiddleware, controller.getProfile);
router.put("/profile", authMiddleware, controller.updateProfile);
router.put("/change-password", authMiddleware, controller.changePassword);

router.get("/notifications", authMiddleware, controller.getNotifications);
router.put("/notifications", authMiddleware, controller.updateNotifications);

router.get("/school", authMiddleware, controller.getSchool);
router.put("/school", authMiddleware, controller.updateSchool);

module.exports = router;