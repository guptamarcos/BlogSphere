const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const bcrypt = require("bcrypt");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/GenerateTokens.js");

async function registerService(body) {
  const { username, email, password } = body;

  // CHECK USERNAME,EMAIL,PASSWORD EXIST OR NOT
  if (!username || !email || !password) {
    throw new ExpressError(
      400,
      "Username, Email, Password all fields are required",
    );
  }

  // CHECK USERNAME IS ALREADY EXIST
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    throw new ExpressError(409, "Username is already exist");
  }

  // CHECK EMAIL IS ALREADY EXIST
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new ExpressError(409, "Email is already exist");
  }

  // CREATING NEW USER
  const newUser = await User.create({ username, email, password });

  return {
    success: true,
    user: {
      username: newUser.username,
      email: newUser.email,
    },
    message: "User is successfully registered!!",
  };
}

async function loginService(body) {
  const { username, password } = body;
  // console.log(username, password);
  // CHECK USERNAME,PASSWORD EXIST OR NOT IN REQUEST BODY
  if (!username || !password) {
    throw new ExpressError(400, "Username, Password both fields are required");
  }

  // CHECK USER DOCUMENT IS EXIST OR NOT
 
  let user = await User.findOne({ username }).select("+password");
  console.log("user", user);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  // CHECKING THE USER PASSWORD IS CORRECT OR NOT
  const comparePassword = await bcrypt.compare(password, user?.password);
  if (!comparePassword) {
    throw new ExpressError(401, "Invalid Credentials!!");
  }
   
  const accessToken = await generateAccessToken(user._id);
  const refreshToken = await generateRefreshToken(user._id);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    { new: true },
  );

  return {
    accessToken,
    refreshToken,
    success: true,
    message: "User LoggedIn successfully!!",
  };
}

async function refreshToken(refreshToken) {
  if (!refreshToken) {
    throw new ExpressError(401, "No refresh token found");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ExpressError(401, "Invalid refresh token");
  }

  if (new Date() > user.refreshTokenExpiresAt) {
    await User.findByIdAndUpdate(user._id, {
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });

    throw new ExpressError(401, "Refresh token expired");
  }

  const newAccessToken = await generateAccessToken(user._id);

  return {
    newAccessToken,
    success: true,
    message: "Refresh token refreshed",
  };
}

module.exports = {
  registerService,
  loginService,
  refreshToken,
};
