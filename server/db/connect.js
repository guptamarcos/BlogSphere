require("dotenv").config();

const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");

async function connectDb() {
  try {
    if (!process.env.MONGO_URI) {
      throw new ExpressError(500,"Database url not exist!!");
    }
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    throw new ExpressError(err.status,err.message);
  }
}

module.exports = connectDb;
