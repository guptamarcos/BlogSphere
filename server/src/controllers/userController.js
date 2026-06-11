const userServices = require("../services/userServices.js");

// GETTING USER DETAILS
async function getUserDetails(req, res) {
  const user = req.user;
  return res.status(200).json({
    success: true,
    user,
  });
}

// ------> USER PASSWORD UPDATE ROUTE  <---------
async function updateUserPassword(req, res) {
  const userId = req.user._id;
  const result = await userServices.updatePassword(userId, req.body);

  return res.status(200).json(result);
}

// ------> UPDATE USER BIO <---------
async function updateUserBio(req, res) {
  const userId = req.user._id;
  console.log(req.body, userId);
  const result = await userServices.updateBio(userId, req.body);
  return res.status(200).json(result);
}

// ---------> UPDATING USER IMAGE <-----------
async function updateUserImage(req, res) {
  const userId = req.user._id;
  const result = await userServices.updateUserImage(userId, req.file);
  return res.status(200).json(result);
}

// GETTING USER ALL BLOGS
async function getUserAllBlogs(req, res) {
  const userId = req.user._id;
  const result = await userServices.getUserBlogs(userId);

  return res.status(200).json(result);
}


module.exports = {
  getUserDetails,
  updateUserImage,
  updateUserPassword,
  updateUserBio,
  getUserAllBlogs
};
