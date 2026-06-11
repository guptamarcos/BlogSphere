import { fetchApi } from "./fetchApi";

export const GetUser = function () {
  return fetchApi("/users/me", {
    method: "GET",
  })
}


export const GetUserBlogs = function () {
  return fetchApi("/users/blogs", {
    method: "GET"
  });
};

export const UpdateBio = function (data) {
  return fetchApi("/users/bio", {
    method: "PATCH", 
    body: JSON.stringify(data)
  });
};

export const UpdatePassword = function (data) {
  return fetchApi("/users/password", {
    method: "PATCH", 
    body: JSON.stringify(data)
  });
};

export const UpdateProfileImage = function (formData) {
  return fetchApi("/users/profile-image", {
    method: "PATCH", 
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};


