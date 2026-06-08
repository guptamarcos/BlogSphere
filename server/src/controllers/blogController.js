const blogServices = require("../services/blogServices.js");

// GETTING APPLICATION ALL BLOGS
async function getAllBlogs(req, res) {
  const result = await blogServices.getBlogs();
  return res.status(200).json(result);
}

// INDIVIDUAL BLOG INFORMATION
async function getBlogInfo(req, res) {
  const { id } = req.params;
  const result = await blogServices.getBlogInfo(id);
  return res.status(200).json(result);
}

// ALL LIKES
async function handleLikes(req, res) {
  const { blogId } = req.params;
  const result = await blogServices.handleLikes(blogId, req.body);

  return res.status(201).json(result);
}

// DELETING THE BLOG
async function deleteBlog(req, res) {
  let userId = req.user._id;
  let { blogId } = req.params;
  const result = await blogServices.deleteBlog(userId, blogId);
  return res.status(200).json(result);
}

// GETTING RELATED BLOGS
async function getRelatedBlogs(req, res) {
  const { blogId } = req.params;
  const result = await blogServices.getRelatedBlogs(blogId);
  return res.status(200).json(result);
}

async function getBlogsByCategory(req, res) {
  const { blogCategory } = req.params;
  const result = await blogServices.getBlogsByCategory(blogCategory);
  return res.status(200).json(result);
}

async function getAllCategory(req, res) {
  const result = await blogServices.getAllCategories();
  return res.status(200).json(result);
}

async function userAllBlogsAllComments(req, res) {
  const result = await blogServices.getUserBlogComments(req.user._id);
  return res.status(200).json(result);
}

// async function addBlog(req, res) {}

module.exports = {
  getAllBlogs,
  getBlogInfo,
  handleLikes,
  getAllCategory,
  getBlogsByCategory,
  getRelatedBlogs,
  deleteBlog,
  userAllBlogsAllComments
};
