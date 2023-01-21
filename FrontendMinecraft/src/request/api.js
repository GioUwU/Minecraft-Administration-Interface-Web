import Axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    return localStorage.getItem("token");
  } 
}; 

const api = Axios.create({
  baseURL: "http://104.128.60.130:25507/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-access-token": getToken(),
  },
});

export default api;
