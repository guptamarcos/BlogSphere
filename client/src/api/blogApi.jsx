import { fetchApi } from "./fetchApi";

export const GetBlogs = function () {
  return fetchApi("/blogs", {
    method: "GET"
  })
}

export const UserBlogComments = function () {
  return fetchApi("/blogs/me/comments", {
    method: "GET",
  });
};

export const GetBlogComments = function (blogId) {
  return fetchApi(`/blogs/${blogId}/comments`, {
    method: "POST",
  });
};

export const GetBlogInfo = function (blogId) {
  return fetchApi(`/blogs/${blogId}`, {
    method: "GET"
  });
};

export const UpdateBlogLikes = function (blogId, isLiked) {
  return fetchApi(`/blogs/${blogId}/like`, {
    method: "POST",
    body: JSON.stringify(isLiked)
  });
};

export const DeleteBlog = function (blogId){
  return fetchApi(`/blogs/${blogId}`, {
    method: "DELETE"
  })
}

export const GetBlogsByCategory = function (categoryName){
  return fetchApi(`/blogs/category/${categoryName.toLowerCase()}`, {
    method: "GET"
  })
}

export const GetRelatedBlogs = function (blogId){
  return fetchApi(`/blogs/${blogId}/related-blogs`, {
    method: "GET"
  })
}

export const GetAllCategory = function (){
  return fetchApi("/blogs/categories", {
    method: "GET"
  })
}