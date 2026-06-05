const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogSchema.js");
const Comment = require("../models/commentSchema.js");


// GETTING USER DETAILS
async function getUserDetails(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
}

// ------> USER PASSWORD UPDATE ROUTE  <---------
async function updateUserPassword(req, res) {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  // CHECK OLDPASSWORD AND NEWPASSWORD PRESENT OR NOT IN REQUEST BODY
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Oldpassword and newPassword both are required",
    });
  }

  const user = await User.findOne({ _id: userId });
  // CHECKING USER PASSWORD IS CORRECT OR NOT
  const comparePassword = await user.checkPassword(oldPassword);
  if (!comparePassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password!!",
    });
  }

  // SAVING THE NEW PASSWORD
  await user.updateUserPassword(newPassword);

  // CLEARING OLD PASSWORD COOKIE
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  // GENERATING NEW TOKEN FOR NEW PASSWORD
  const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", newToken, {
    httpOnly: true,
    signed: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res
    .status(200)
    .json({ success: true, message: "User password updated successfully" });
}

// ------> UPDATE USER BIO <---------
async function updateUserBio(req, res) {
  const userId = req.user._id;
  const { bio } = req.body;

  // IF BIO IS NOT PRESENT IN REQUEST BODY
  if (!bio) {
    return res.status(400).json({ success: false, message: "Bio is missing" });
  }

  const user = await User.findOne({ _id: userId });
  user.bio = bio;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Bio updated successfully" });
}

// ---------> UPDATING USER IMAGE <-----------
async function updateUserImage(req, res) {
  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(userId, {
    $set: { profileImage: `/uploads/${req.file.filename}` },
  });
  return res
    .status(201)
    .json({
      success: true,
      message: "Image added successfully!!",
      profileImage: user.profileImage,
    });
}

async function userAllBlogsAllComments(req, res) {
  const userId = req.user._id;
  const userAllBlogsId = await Blog.find({ owner: userId }).select("_id");

  const userBlogAllComments = await Comment.find({
    blogId: { $in: userAllBlogsId },
  }).populate([
    {
      path: "owner",
      select: "username",
    },
    {
      path: "blogId",
      select: "title",
    },
  ]);

  return res.status(200).json({ success: true, data: userBlogAllComments });
}


module.exports = {
  getUserDetails,
  userAllBlogsAllComments,
  updateUserImage,
  updateUserPassword,
  updateUserBio,
};
