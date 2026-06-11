const authServices = require("../services/authServices.js");
const User = require("../models/userSchema.js")


async function register(req, res) {
  const result = await authServices.registerService(req.body);

  return res.status(201).json(result);
}

async function login(req, res) {
  const result = await authServices.loginService(req.body);
  res.cookie("accessToken", result?.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15*60*60 * 1000,
    signed: true,
  });

  res.cookie("refreshToken", result?.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7*24*60*60 * 1000,
    signed: true,
  });

  return res.status(200).json({
    success: result?.success,
    message: result?.message,
  });
}

// ------> USER LOGOUT ROUTE  <---------
async function logout(req, res){
  await User.findByIdAndUpdate(req.user._id, {refreshToken: null});

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  return res.status(200).json("Logout successful");
}

async function refreshToken(req, res) {
  const refreshToken = req.signedCookies.refreshToken;
  const result = await authServices.refreshToken(refreshToken);

  if (result?.newAccessToken) {
    res.cookie("accessToken", result.newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 1000,
      signed: true,
    });
  }

  return res.status(200).json(result);
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
