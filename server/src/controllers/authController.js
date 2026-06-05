const authServices = require("../services/authServices.js");

async function signupController(req, res) {
  const result = await authServices.registerService(req.body);

  return res.status(201).json(result);
}

async function loginController(req, res) {
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
async function logoutController(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    signed: true,
  });

  return res.status(200).json("Logout successful");
}

module.exports = {
  signupController,
  loginController,
  logoutController,
};
