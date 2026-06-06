const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const {
  signup,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController.js");

router.post("/signup", wrapAsync(signup));
router.post("/login", wrapAsync(login));
router.post("/logout", verifyAndCheckToken, wrapAsync(logout));
router.post("/refresh",wrapAsync(refreshToken));

module.exports = router;