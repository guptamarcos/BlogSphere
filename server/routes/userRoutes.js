const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {signupController,getUserDetails, loginController, logoutController, updatePassword, updateBio} = require("../controllers/userController.js");

router.get("/getUser",wrapAsync(getUserDetails))
router.post("/signup",wrapAsync(signupController));
router.post("/login",wrapAsync(loginController));
router.post("/logout",wrapAsync(logoutController));
router.patch("/updatePassword",wrapAsync(updatePassword));
router.patch("/updateBio",wrapAsync(updateBio))

module.exports = router;