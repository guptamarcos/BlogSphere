import { fetchApi } from "./fetchApi";

export const loginUser = async function (userData) {
   return fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(userData)
   })
}

export const registerUser = async function (userData) {
   return fetchApi("/auth/register", {
     method: "POST", 
     body: JSON.stringify(userData)
   })
}