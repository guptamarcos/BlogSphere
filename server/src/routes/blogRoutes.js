const express = require("express");
const router = express.Router({mergeParams: true});
const { getAllBlogs,getBlogInfo,getBlogsByCategory, deleteBlog, handleLikes ,  userAllBlogsAllComments,
getRelatedBlogs, getAllCategory} = require("../controllers/blogController.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/getAllBlogs", verifyAndCheckToken, wrapAsync(getAllBlogs));
router.get("/me/comments", verifyAndCheckToken, wrapAsync(userAllBlogsAllComments));
router.get("/getAllCategory", verifyAndCheckToken, wrapAsync(getAllCategory));
router.get("/category/:blogCategory", verifyAndCheckToken, wrapAsync(getBlogsByCategory));
router.get("/:blogId/relatedBlogs", verifyAndCheckToken, wrapAsync(getRelatedBlogs));
router.get("/:id",verifyAndCheckToken, wrapAsync(getBlogInfo));
router.post("/:blogId/like", verifyAndCheckToken, wrapAsync(handleLikes));
router.delete("/:blogId", verifyAndCheckToken, wrapAsync(deleteBlog));

module.exports = router; 