import axios from "axios";
import api from "./api";


export const registerBan = async (data) => {
    try {
        const response = await api.post("/registerSancion", data);
        return response
    } catch (error) {
        return error
    }
};


export const getAllBans = async () => {
    try {
        const response = await api.get("/getAllHistory");
        return response
    } catch (error) {
        return error
    }
}

export const getBansByUser = async (id) => {
    
    try {
        const response = await api.get(`/getHistoryBiId/${id}`);
        return response
    } catch (error) {
        return error
    }
}

export const autorizarSancion = async (id) => {
    try {
        const response = await api.post(`/authoRizeSanction/${id}`);
        return response
    } catch (error) {
        return error
    }
}

export const uploadProofs = async (id, data) => {
    const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `/uploadProofs/${id}`,
      data,
      //se debe poder mandar sin que de error de cors
        {  
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": token,
            },
        }

    );
    return response;
  } catch (error) {
   
    return error;
  }
};

export const rejectSancion = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await api.delete(`/deleteHistory/${id}`, {
            headers: {
                "x-access-token": token,
            },
        }); 
        return response
    } catch (error) {
        return error
    }
}



