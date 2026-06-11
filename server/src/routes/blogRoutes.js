const express = require("express");
const router = express.Router({mergeParams: true});
const { getAllBlogs,getBlogInfo,getBlogsByCategory, deleteBlog, handleLikes ,  userAllBlogsAllComments,
getRelatedBlogs, getAllCategory} = require("../controllers/blogController.js");
const { verifyAndCheckToken } = require("../middlewares/auth.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/", wrapAsync(getAllBlogs));
router.get("/me/comments", verifyAndCheckToken, wrapAsync(userAllBlogsAllComments));
router.get("/categories", wrapAsync(getAllCategory));
router.get("/category/:blogCategory", wrapAsync(getBlogsByCategory));
router.get("/:blogId/related-blogs", wrapAsync(getRelatedBlogs));
router.get("/:id", wrapAsync(getBlogInfo));
router.post("/:blogId/like", verifyAndCheckToken, wrapAsync(handleLikes));
router.delete("/:blogId", verifyAndCheckToken, wrapAsync(deleteBlog));

module.exports = router; 