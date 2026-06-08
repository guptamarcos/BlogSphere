const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const {getUserDetails,getUserAllBlogs, updateUserImage,
updateUserPassword, updateUserBio} = require("../controllers/userController.js");
const upload = require("../middlewares/multer.js");

router.get("/getUser",verifyAndCheckToken, wrapAsync(getUserDetails));
router.get("/users/blogs", verifyAndCheckToken, wrapAsync(getUserAllBlogs));
router.patch("/updatePassword",verifyAndCheckToken, wrapAsync(updateUserPassword));
router.patch("/updateBio",verifyAndCheckToken, wrapAsync(updateUserBio));
router.patch("/updateUserProfileImage", verifyAndCheckToken,upload.single("profileImage"), wrapAsync(updateUserImage));

module.exports = router;