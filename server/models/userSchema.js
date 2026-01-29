const mongoose = require("mongoose");
const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [3, "Username must contain at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        emailRegex,
        "Email must be valid"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        passwordRegex,
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
      ],
    },
    allBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true },
);

// PRE MIDDLEWARE FOR HASHING USER PASSWORD 
userSchema.pre("save",async function (){
  if(!this.isModified("password")){
    return ;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// UPDATE THE USER PASSWORD
userSchema.methods.updatePassword = async function(newPassword){
  this.password = newPassword;
  await this.save();
}

// CHECK USER PASSWORD 
userSchema.methods.checkPassword = async function(password){
  return await bcrypt.compare(password,this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
