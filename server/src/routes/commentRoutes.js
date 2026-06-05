const express = require("express");
const router = express.Router({mergeParams: true});
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {addComment, deleteComment} = require("../controllers/commentController.js");

router.post("/", verifyAndCheckToken, wrapAsync(addComment));
router.delete("/:commentId", verifyAndCheckToken, wrapAsync(deleteComment));

module.exports = router;