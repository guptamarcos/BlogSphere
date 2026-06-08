const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

// AUTH MIDDLEWARE FOR CHECK USER EXIST OR NOT
const verifyAndCheckToken = async (req, res, next) => {
  try {
    // GETTING THE TOKEN
    const token = req.signedCookies?.token;
    console.log(token);

    // CHECK THE TOKEN EXIST IN REQUEST BODY OR NOT
    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }

    // DECODING THE TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);

    // CHECKING THE USER
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    console.log(user);

    // ATTACHING THE USER TO THE REQUEST BODY
    req.user = user;
    console.log("Auth", user);

    // PASSING THE CONTROL TO THE NEXT ROUTE OR MIDDLEWARE
    next();
  } catch (err) {
    return res.status(404).json({success: false, message: err});
  }
};

module.exports = { verifyAndCheckToken };
