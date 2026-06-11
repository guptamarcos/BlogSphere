const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      required: [true, "Blog title is required"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Blog content is required"],
    },
    blogImage: {
      type: String,
      trim: true,
      default: "",
    },
    likes: {
      type: Number,
      min: [0, "Likes value can't be negative"],
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Category is required"],
      lowercase: true,
    },
    allComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
