const wrapAsync = require("./wrapAsync.js");
const jwt = require("jsonwebtoken");

const generateRefreshToken = async function (userId) {
  return await jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const generateAccessToken = async function (userId) {
  return await jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
};
