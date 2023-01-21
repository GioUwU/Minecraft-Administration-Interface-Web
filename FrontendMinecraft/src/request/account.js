import api from "./api";
import axios from "axios";

export const getallAccounts = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await api.get("/getAllUsers", {
          headers: {
            "x-access-token": token,
          },
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const deleteAccount = async (id) => {
  
    const token = localStorage.getItem("token");
    try {
       //mandar por body {id: id}
        const response = await api.delete("/deleteUser", {
          headers: {
            "x-access-token": token,
          },
          data: {
            id: id,
          },
        });
        return response;
        

    } catch (error) {
        return error;
    }
}

export const registerAccount = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    return error;
  }
};


export const updateAvatar = async (id, data) => {
  //content-type: multipart/form-data
  try {
    const response = await api.post(`/updateAvatar/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getAvatar = async (id) => {
  try {
    const response = await axios.get(`https://back.mariana-re.com/avatar/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}