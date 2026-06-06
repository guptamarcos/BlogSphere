const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError.js");
const bcrypt = require("bcrypt");

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
  console.log(newUser);

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
  console.log(username, password);
  // CHECK USERNAME,PASSWORD EXIST OR NOT IN REQUEST BODY
  if (!username || !password) {
    throw new ExpressError(400, "Username, Password both fields are required");
  }

  // CHECK USER DOCUMENT IS EXIST OR NOT
  let user = await User.findOne({ username });
  if (!user) {
    throw new ExpressError(404, "User not found");
  }
  console.log(user);

  // CHECKING THE USER PASSWORD IS CORRECT OR NOT
  const comparePassword = await bcrypt.compare(password, user.password);
  console.log(comparePassword)
  if (!comparePassword) {
    throw new ExpressError(401, "Invalid Credentials!!");
  }

  // GENERATING THE TOKEN
  // PAYLOAD , SECRET_KEY , EXPIRY_TIME
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return {
    token,
    success: true,
    message: "User LoggedIn successfully!!",
  };
}


module.exports = {
  registerService,
  loginService,
};
