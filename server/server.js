require("dotenv").config();

if(!process.env.PORT || !process.env.COOKIE_SECRET_KEY || !process.env.CLIENT_URL){
  console.error("Environmental Variables not exist !!");
  process.exit(1);
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");


// SETTING UP SERVER MIDDLEWARES
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// IMPORTING ROUTES
const authRoutes = require("./src/routes/authRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const blogRoutes = require("./src/routes/blogRoutes.js");
const commentRoutes = require("./src/routes/commentRoutes.js");


const connectDb = require("./src/config/connect.js");

// CONNECTING DATABASE
connectDb()
  .then(() => {
 
    // CREATE AND START THE SERVER 
    app.listen(port, () => {
      console.log(`Server is listening on the ${port}`);
    });

    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("Database not connected \n ",err);
    process.exit(1);
  });


// ROUTING MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/auth",userRoutes);
app.use("/api/blogs",blogRoutes);
app.use("/api/blogs/:blogId/comments",commentRoutes);


// IF API ENDPOINT NOT EXIST 
app.use((req,res,next)=>{
  return res.status(404).json({success: false, message: "Api endpoint not exist!!"});
});


// ERROR HANDLING MIDDLEWARE (Api Error)
app.use((err,req,res,next)=>{
  const { status=500 , message="Internal Server Error" } = err;
  res.status(status).json({success: false, message: message});
})