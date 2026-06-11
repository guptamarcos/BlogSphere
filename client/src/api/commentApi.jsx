import { fetchApi } from "./fetchApi";

export const DeleteComment = function (blogId, commentId) {
    return fetchApi(`/blogs/${blogId}/comments/${commentId}`,{
        method: "DELETE",
    })
}

export const AddComment = function (blogId, commentContent){
    return fetchApi(`/blogs/${blogId}/comments`, {
        method : "POST", 
        body: JSON.stringify(commentContent)
    })
}