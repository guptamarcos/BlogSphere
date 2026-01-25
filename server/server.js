require("dotenv").config();

if(!process.env.PORT){
   console.error("Environmental Variables not exist !!");
   process.exit(1);
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

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

// IF API ENDPOINT NOT EXIST 
app.use((req,res)=>{
    return res.status(404).json({success: false, message: "Api endpoint not exist!!"});
});

// ERROR HANDLING MIDDLEWARE (Api Error)
app.use((err,req,res,next)=>{
    const { status=500 , message="Internal Server Error" } = err;
    res.status(status).json({success: false, message: message});
})