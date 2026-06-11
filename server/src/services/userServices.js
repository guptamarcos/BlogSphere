const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogSchema.js");
const Comment = require("../models/commentSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const bcrypt = require("bcrypt");

async function updatePassword(userId, body) {
  const { oldPassword, newPassword } = body;

  // CHECK OLDPASSWORD AND NEWPASSWORD PRESENT OR NOT IN REQUEST BODY
  if (!oldPassword || !newPassword) {
    throw new ExpressError(
      400,
      "Oldpassword and newPassword both are required",
    );
  }

  const user = await User.findById(userId);
  const comparePassword = await bcrypt.compare(password, this.password);
  if (!comparePassword) {
    throw new ExpressError(401, "Incorrect Password!!");
  }

  user.password = newPassword;
  await user.save();

  return { success: true, message: "User password updated successfully" };
}

async function updateBio(userId, body) {
  const { bio } = body; 

  // IF BIO IS NOT PRESENT IN REQUEST BODY
  if (!bio) {
    throw new ExpressError(400, "Bio is missing");
  }

  const user = await User.findOne({ _id: userId });
  try{
    user.bio = bio;
    await user.save();
    console.log("user1", user);
  }catch(err){
    console.log(err);
  }
  console.log(user);

  return { success: true, message: "Bio updated successfully" };
}

async function updateProfileImage(userId, file) {
  const user = await User.findByIdAndUpdate(userId, {
    $set: { profileImage: `/uploads/${file.filename}` },
  });

  return {
    success: true,
    message: "Image added successfully!!",
    profileImage: user.profileImage,
  };
}

async function getUserBlogs(userId) {
  const userAllBlogs = await Blog.find({ owner: userId }).populate(
    "owner",
    "username",
  );

  return { success: true, data: userAllBlogs };
}

module.exports = {
  updatePassword,
  updateBio,
  updateProfileImage,
  getUserBlogs
};
