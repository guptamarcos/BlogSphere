import { fetchApi } from "./fetchApi";

export const getUserBlogs = async function () {
  return fetchApi("/auth/users/blogs", {
    method: "GET"
  });
};
