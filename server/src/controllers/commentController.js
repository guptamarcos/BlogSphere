const commentServices = require("../services/commentServices.js");

// ADD THE COMMENT 
async function addComment(req,res){
    const { blogId } = req.params;
    const result = await commentServices.addComment(blogId, req.body, req.user._id);
    return res.status(200).json(result);
}


async function deleteComment(req,res){
    const {commentId} = req.params;
    const result = await commentServices.deleteComment(commentId);
    return res.status(200).json(result);
}

module.exports = { addComment, deleteComment };