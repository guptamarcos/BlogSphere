const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must contain at least 3 characters"],
      maxLength: [50, "Username can't exceed the 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        passwordRegex,
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
      ],
      select: false,
    },
    allBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxLength: [250, "Bio cannot exceed 250 characters"],
    },
  },
  { timestamps: true },
);

// PRE MIDDLEWARE FOR HASHING USER PASSWORD
userSchema.pre("save", async function () {
  // CHECKING PASSWORD IS CREATED OR MODIFIED
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
