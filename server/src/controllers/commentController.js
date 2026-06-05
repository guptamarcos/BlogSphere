const Blog = require("../models/blogSchema.js");
const Comment = require("../models/commentSchema.js");

// ADD THE COMMENT 
async function addComment(req,res){
    const {commentContent} = req.body;
    const { blogId } = req.params;
   
    if(!commentContent || !commentContent.trim()){
        return res.status(400).json({success: false, message: "Comment can't be empty"});
    }
    
    const currComment = await Comment.create({content: commentContent, owner: req.user._id, blogId: blogId});
    
    const currBlog = await Blog.findByIdAndUpdate(blogId, {$push: {allComments: currComment._id}}, {new: true});
    
    return res.status(201).json({success: true, data: currComment});
}


async function deleteComment(req,res){
    const {commentId} = req.params;
    
    if(!commentId){
        return res.status(400).json({success: false, message: "Comment Id is required!!"});
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if(!deleteComment){
        return res.status(400).json({success: false, message: "Comment not found"});
    }
    let blogId = deleteComment._id;
    await Blog.updateOne({_id: blogId}, {$pull: {allComments: commentId}});

    return res.status(200).json({success: true, data: deleteComment});
}

module.exports = { addComment, deleteComment };