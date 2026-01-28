require("dotenv").config();

if(!process.env.PORT || !process.env.COOKIE_SECRET_KEY){
  console.error("Environmental Variables not exist !!");
  process.exit(1);
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const cookieParser = require("cookie-parser");


// SETTING UP SERVER MIDDLEWARES
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));


// IMPORTING ROUTES
const userRoutes = require("./routes/userRoutes.js");

const connectDb = require("./db/connect.js");

// CONNECTING DATABASE
connectDb()
  .then((res) => {
 
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
app.use("/api/auth",userRoutes);


// IF API ENDPOINT NOT EXIST 
app.use((req,res)=>{
  return res.status(404).json({success: false, message: "Api endpoint not exist!!"});
});

// ERROR HANDLING MIDDLEWARE (Api Error)
app.use((err,req,res,next)=>{
  const { status=500 , message="Internal Server Error" } = err;
  res.status(status).json({success: false, message: message});
})