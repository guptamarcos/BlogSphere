const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const {getUserDetails,getUserAllBlogs, updateUserImage,
updateUserPassword, updateUserBio} = require("../controllers/userController.js");
const upload = require("../middlewares/multer.js");

router.get("/me",verifyAndCheckToken, wrapAsync(getUserDetails));
router.get("/blogs", verifyAndCheckToken, wrapAsync(getUserAllBlogs));
router.patch("/password",verifyAndCheckToken, wrapAsync(updateUserPassword));
router.patch("/bio",verifyAndCheckToken, wrapAsync(updateUserBio));
router.patch("/profile-image", verifyAndCheckToken,upload.single("profileImage"), wrapAsync(updateUserImage));

module.exports = router;