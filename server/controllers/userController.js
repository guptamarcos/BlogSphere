const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");

// ------> USER SIGN UP ROUTE  <---------
async function signupController(req, res) {
  const { username, email, password } = req.body;

  // CHECK USERNAME,EMAIL,PASSWORD EXIST OR NOT
  if (!username || !email || !password) {
   return res.status(400).json({
      success: false,
      message: "Username, Email, Password all fields are required",
   });
  }

  // CHECK USERNAME IS ALREADY EXIST
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
   return res.status(409).json({ 
      success: false,
      message: "Username is already exist!!" 
   });
  }

  // CHECK EMAIL IS ALREADY EXIST
  const emailExist = await User.findOne({ email });
  if (emailExist) {
   return res.status(409).json({ 
      success: false, 
      message: "Email id is already exist" 
   });
  }

  const newUser = await User.create({ username, email, password });

   return res.status(201).json({
      success: true,
      user: {
         username: newUser.username,
         email: newUser.email
      },
      message: "User is successfully registered!!",
   });
}


// ------> USER LOGIN ROUTE  <---------
async function loginController(req, res) {
  const { username, password } = req.body;

  // CHECK USERNAME,EMAIL,PASSWORD EXIST OR NOT
  if (!username || !password) {
   return res.status(400).json({
      success: false,
      message: "Username,Password all fields are required",
   });
  }

  // CHECK USER DOCUMENT IS EXIST OR NOT
  let checkUser = await User.findOne({ username: username });
  if (!checkUser) {
   return res.status(401).json({ 
      success: false, 
      message: "Invalid Credentials!!" 
   });
  }

  // CHECKING THE USER PASSWORD IS CORRECT OR NOT
  const comparePassword = await checkUser.checkPassword(password);
  if (!comparePassword) {
   return res.status(401).json({ 
      success: false, 
      message: "Incorrect password!!" 
   });
  }
  
  // PAYLOAD , SECRET_KEY , EXPIRY_TIME
  const token = jwt.sign({userId: checkUser._id},process.env.JWT_SECRET_KEY,{expiresIn: "1d"});
  res.cookie("token",token,{
   httpOnly: true,
   secure: false,
   sameSite: "lax",
   maxAge: 1*24*60*60*1000,
   signed: true,
  })

  return res.status(200).json({ 
   success: true, 
   message: "User LoggedIn successfully!!",
  });
}


// GETTING USER DETAILS 
async function getUserDetails(req,res){
   const token = req.signedCookies.token;

   // CHECKING TOKEN
   if(!token){
      return res.status(401).json("Token missing!!");
   }
   
   // DECODING THE TOKEN
   // DECODED IS THE OBJECT WHICH CONTAIN ALL THE INFORMATION WHICH WE SIGN IN JWT TOKEN 
   const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
   
   // CHECK USER EXIST OR NOT
   const user = await User.findOne({_id:decoded.userId});
   if(!user){
      return res.status(404).json("User not found!!");
   }
   
   return res.status(200).json({
      success: true, user
   });
}


// ------> USER LOGOUT ROUTE  <---------
async function logoutController(req, res) {
   res.clearCookie("token",{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      signed: true,
   })
   return res.status(200).json("Logout successful");
}


// ------> USER PASSWORD UPDATE ROUTE  <---------
async function updatePassword(req,res){
   const { oldPassword, newPassword} = req.body;
   
   // CHECK OLDPASSWORD AND NEWPASSWORD EXIST OR NOT
   if (!oldPassword || !newPassword ) {
   return res.status(400).json({
      success: false,
      message: "Oldpassword and newPassword both are required",
    });
   }
   
   const oldToken = req.signedCookies.token;
   
   // CHECKING TOKEN
   if(!oldToken){
      return res.status(401).json({success: false, message: "Token missing"});
   }
   
   // DECODING TOKEN 
   const decoded = jwt.verify(oldToken,process.env.JWT_SECRET_KEY);
   
   // CHECKING USER IS PRESENT OR NOT 
   const user = await User.findOne({_id: decoded.userId});
   if(!user){
      return res.status(404).json({success: false, message: "User not found"});
   }
   
   // CHECKING USER PASSWORD IS CORRECT OR NOT 
   const comparePassword = await user.checkPassword(oldPassword);
   if (!comparePassword) {
   return res.status(401).json({ 
      success: false, 
      message: "Incorrect password!!" 
    });
   }

   // SAVING THE NEW PASSWORD 
   await user.updateUserPassword(newPassword);

   // CLEARING OLD PASSWORD COOKIE 
   res.clearCookie("token",{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      signed: true,
   })
   
   // GENERATING NEW TOKEN FOR NEW PASSWORD
   const newToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
   res.cookie("token",newToken,{
      httpOnly: true,
      signed: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1*24*60*60*1000,
   });

   res.status(200).json({success: true, message: "User password updated successfully"});
   
} 

// ------> UPDATE USER BIO <---------
async function updateBio(req,res){
   const { bio } = req.body;

   if(!bio){
      return res.status(400).json({success: false, message: "Bio is missing"});
   }

   const token = req.signedCookies.token;
   
   if(!token){
      return res.status(400).json({success: false, message: "Token is missing"});
   }

   const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

   const user = await User.findOne({_id: decoded.userId});
   if(!user){
      return res.status(404).json({success: false, message: "User not found"});
   }

   
   console.log("updating bio");
   user.bio = bio;
   await user.save();
   console.log("Bio is updated");

   return res.status(200).json({success: true, message: "Bio updated successfully"});
}

module.exports = { signupController, loginController, getUserDetails, logoutController,updatePassword,updateBio };
