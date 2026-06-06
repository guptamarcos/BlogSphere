const Blog = require("../models/blogSchema.js");
const Comment = require("../models/commentSchema.js");
const ExpressError = require("../utils/ExpressError.js");

async function addComment(blogId, body, userId) {
  const { commentContent } = body;

  if (!commentContent || !commentContent.trim()) {
    throw new ExpressError(400, "Comment can't be empty");
  }

  const currComment = await Comment.create({
    content: commentContent,
    owner: userId,
    blogId,
  });

  const currBlog = await Blog.findByIdAndUpdate(
    blogId,
    { $push: { allComments: currComment._id } },
    { new: true },
  );

  return res.status(201).json({ success: true, data: currComment });
}

async function deleteComment(commentId) {
  if (!commentId) {
    return res
      .status(400)
      .json({ success: false, message: "Comment Id is required!!" });
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deleteComment) {
    throw new ExpressError(400, "Comment not found");
  }
  let blogId = deleteComment._id;
  await Blog.updateOne({ _id: blogId }, { $pull: { allComments: commentId } });

  return { success: true, data: deleteComment };
}


module.exports = {
  addComment,
  deleteComment,
};
