require("dotenv").config();

const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");

async function connectDb() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("Database url not exist in env file")
      throw new ExpressError(500, "Internal Server Error");
    }
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("Error in Database connection", err);
    throw new ExpressError(err.status, err.message);
  }
}

module.exports = connectDb;
