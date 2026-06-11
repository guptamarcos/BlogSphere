import { fetchApi } from "./fetchApi";

export const loginUser = function (userData) {
   return fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(userData)
   })
}

export const registerUser = function (userData) {
   return fetchApi("/auth/register", {
     method: "POST", 
     body: JSON.stringify(userData)
   })
}

export const logoutUser = function (){
   return fetchApi("/auth/logout", {
      method: "POST"
   }) 
}