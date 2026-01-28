const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {signupController,getUserDetails, loginController, logoutController} = require("../controllers/userController.js");

router.get("/getUser",wrapAsync(getUserDetails))
router.post("/signup",wrapAsync(signupController));
router.post("/login",wrapAsync(loginController));
router.post("/logout",wrapAsync(logoutController));

module.exports = router;