const Blog = require("../models/blogSchema.js");
const User = require("../models/userSchema.js");

async function getBlogs() {
  const allBlogs = await Blog.find({}).populate("owner", "username");
  return {
    success: true,
    data: allBlogs,
  };
}

async function getBlogInfo(blogId) {
  const blogInfo = await Blog.findById(blogId).populate([
    {
      path: "owner",
      select: "username",
    },
    {
      path: "allComments",
      populate: {
        path: "owner",
        select: "username",
      },
    },
  ]);

  return {
    success: true,
    data: blogInfo,
  };
}

async function getUserBlogs(userId) {
  const userAllBlogs = await Blog.find({ owner: userId }).populate(
    "owner",
    "username",
  );

  return { success: true, data: userAllBlogs };
}

async function handleLikes(blogId, body) {
  const { isLiked } = body;

  if (!blogId) {
    throw new ExpressError(400, "Blog Id is required");
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new ExpressError(404, "Blog not found");
  }

  blog.likes += isLiked ? 1 : -1;

  await blog.save();

  return {
    success: true,
    likes: blog.likes,
  };
}

async function deleteBlog(userId, blogId) {
  if (!blogId) {
    throw new ExpressError(400, "Blog Id is required");
  }

  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new ExpressError(404, "Blog not found");
  }

  await User.findByIdAndUpdate(userId, { $pull: { allBlogs: blogId } });

  return { success: true, data: deletedBlog };
}

async function getRelatedBlogs(blogId) {
  if (!blogId) {
    throw new ExpressError(400, "Blog id required");
  }

  const currBlog = await Blog.findById(blogId);
  const allBlogs = await Blog.find({ category: currBlog.category }).select(
    "blogImage title category",
  );

  return { success: true, relatedBlogs: allBlogs };
}

async function getBlogsByCategory(blogCategory) {
  if (!blogCategory) {
    throw new ExpressError(400, "Blog Category is required");
  }

  const allBlogs = await Blog.find({ category: blogCategory });

  return { success: true, data: allBlogs };
}

async function getAllCategories() {
  let allCategory = await Blog.distinct("category");
  return { success: true, data: allCategory };
}

// async function getUserBlogs(){

// }

module.exports = {
  getBlogs,
  getBlogInfo,
  getUserBlogs,
  handleLikes,
  deleteBlog,
  getRelatedBlogs,
  getBlogsByCategory,
  getAllCategories,
};
