const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller.js");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/user/:id", controller.getUserById);
router.put("/user/:id", controller.updateUser);
router.put("/change-password/:id", controller.changePasswordById);

module.exports = router;