const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

// AUTH MIDDLEWARE FOR CHECK USER EXIST OR NOT
const verifyAndCheckToken = async (req, res, next) => {
  try {
    // GETTING THE TOKEN
    const accessToken = req.signedCookies?.accessToken;
    
    // CHECK THE TOKEN EXIST IN REQUEST BODY OR NOT
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // DECODING THE TOKEN
    const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
  
    // CHECKING THE USER
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } 

    // ATTACHING THE USER TO THE REQUEST BODY
    req.user = user;

    // PASSING THE CONTROL TO THE NEXT ROUTE OR MIDDLEWARE
    next();
  } catch (err) {
    console.log("Error in the verifyAndCheckToken middleware " , err);
    return res.status(401).json({ success: false, message: "Access token expired"});
  }
};

module.exports = { verifyAndCheckToken };
