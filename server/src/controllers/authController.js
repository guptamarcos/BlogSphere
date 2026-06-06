const authServices = require("../services/authServices.js");

async function signup(req, res) {
  const result = await authServices.registerService(req.body);

  return res.status(201).json(result);
}

async function login(req, res) {
  const result = await authServices.loginService(req.body);
  res.cookie("token", result?.token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000,
    signed: true,
  });

  return res.status(200).json(result);
}

// ------> USER LOGOUT ROUTE  <---------
async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  return res.status(200).json("Logout successful");
}

async function refreshToken(req,res){
  return res.status(200).json({
    success: true, 
    message: "Refresh token working properly",
  })
}

module.exports = {
  signup,
  login,
  logout,
  refreshToken
};
