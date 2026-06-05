const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const {
  signupController,
  loginController,
  logoutController,
} = require("../controllers/authController.js");

router.post("/signup", wrapAsync(signupController));
router.post("/login", wrapAsync(loginController));
router.post("/logout", verifyAndCheckToken, wrapAsync(logoutController));

module.exports = router;