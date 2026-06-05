const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const {signupController,getUserDetails, loginController, userAllBlogsAllComments, updateUserImage,
logoutController, updateUserPassword, updateUserBio} = require("../controllers/userController.js");
const upload = require("../middlewares/multer.js");

router.get("/getUser",verifyAndCheckToken, wrapAsync(getUserDetails))
router.patch("/updatePassword",verifyAndCheckToken, wrapAsync(updateUserPassword));
router.patch("/updateBio",verifyAndCheckToken, wrapAsync(updateUserBio));
router.get("/users/:userId/comments", verifyAndCheckToken, wrapAsync(userAllBlogsAllComments));
router.patch("/updateUserProfileImage", verifyAndCheckToken,upload.single("profileImage"), wrapAsync(updateUserImage));

module.exports = router;