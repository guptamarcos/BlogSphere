import { fetchApi } from "./fetchApi";

export const UserBlogComments = async function () {
  return fetchApi("/blogs/me/comments", {
    method: "GET",
  });
};

export const GetBlogComments = async function (blogId) {
  return fetchApi(`/blogs/${blogId}/comments`, {
    method: "POST",
  });
};

export const GetBlogInfo = async function (blogId) {
  return fetchApi(`/blogs/${blogId}`, {
    method: "GET"
  });
};

export const UpdateBlogLikes = async function (blogId, isLiked) {
  return fetchApi(`/blogs/${blogId}/like`, {
    method: "POST",
    body: JSON.stringify(isLiked)
  });
};

export const DeleteBlog = async function (blogId){
  return fetchApi(`/blogs/${blogId}`, {
    method: "DELETE"
  })
}
